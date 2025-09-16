from flask import Flask, render_template, request
import pandas as pd
import numpy as np
import joblib
from catboost import CatBoostRegressor
from PIL import Image
import requests
import torch
from torchvision.models import resnet18
import torchvision.transforms as transforms
from io import BytesIO
from sklearn.metrics import mean_squared_error

app = Flask(__name__)

# -------------------------------
# Charger vos modèles et préprocesseurs
# -------------------------------
rf_model = joblib.load("rf_best_model_with_images.pkl")
rf_preprocessor = joblib.load("preprocessor_with_images_rf.pkl")

xgb_model = joblib.load("xgb_rating_model_with_images.pkl")
xgb_preprocessor = joblib.load("preprocessor_with_images_xg.pkl")

catboost_model = CatBoostRegressor()
catboost_model.load_model("catboost_tfidf_best_model.cbm")
catboost_preprocessor = joblib.load("preprocessor_with_images_cat.pkl")

device = "cuda" if torch.cuda.is_available() else "cpu"
resnet = resnet18(weights="IMAGENET1K_V1")
resnet = torch.nn.Sequential(*list(resnet.children())[:-1])
resnet.eval().to(device)

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

def extract_img_features(image_paths):
    features_list = []
    for img_path in image_paths:
        try:
            if img_path.startswith("http"):
                response = requests.get(img_path)
                img = Image.open(BytesIO(response.content)).convert("RGB")
            else:
                img = Image.open(img_path).convert("RGB")
            img_t = transform(img).unsqueeze(0).to(device)
            with torch.no_grad():
                feat = resnet(img_t).cpu().numpy().flatten()
            features_list.append(feat)
        except:
            features_list.append(np.zeros(512))
    return np.array(features_list)

def predict_single_model(new_df, model, preprocessor):
    X_tab = preprocessor.transform(new_df)
    if hasattr(X_tab, "toarray"):
        X_tab = X_tab.toarray()
    X_img = extract_img_features(new_df["featured_image_source"])
    X_full = np.hstack([X_tab, X_img])
    return model.predict(X_full)

# -------------------------------
# Route principale
# -------------------------------
@app.route('/', methods=['GET', 'POST'])
def test():
    results = None
    if request.method == 'POST':
        title = request.form['title']
        asin = request.form['asin']
        price = float(request.form['price'])
        image_path = request.form['image_path']
        real_rating = float(request.form['real_rating'])

        new_product_df = pd.DataFrame([{
            "title": title,
            "asin": asin,
            "sale_price": price,
            "featured_image_source": image_path
        }])

        pred_rf = predict_single_model(new_product_df, rf_model, rf_preprocessor)
        pred_xgb = predict_single_model(new_product_df, xgb_model, xgb_preprocessor)
        pred_cb = predict_single_model(new_product_df, catboost_model, catboost_preprocessor)

        rmse_rf = np.sqrt(mean_squared_error([real_rating], pred_rf))
        rmse_xgb = np.sqrt(mean_squared_error([real_rating], pred_xgb))
        rmse_cb = np.sqrt(mean_squared_error([real_rating], pred_cb))

        results = {
            "pred_rf": round(float(pred_rf[0]), 4),
            "rmse_rf": round(float(rmse_rf), 4),
            "pred_xgb": round(float(pred_xgb[0]), 4),
            "rmse_xgb": round(float(rmse_xgb), 4),
            "pred_cb": round(float(pred_cb[0]), 4),
            "rmse_cb": round(float(rmse_cb), 4)
        }

    return render_template('test_F.html', results=results)

if __name__ == '__main__':
    app.run(debug=True)
