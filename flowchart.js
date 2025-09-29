// flowchart.js

// Assurez-vous que viz.js est déjà chargé dans la page avant ce script
window.addEventListener('DOMContentLoaded', (event) => {
    const dot = `
digraph G {
    rankdir=TB;
    node [shape=box, style=rounded, color=darkblue, fontname="Arial"];
    "Produit brut" -> "Titre du produit";
    "Produit brut" -> "Prix de vente";
    "Produit brut" -> "ASIN";
    "Produit brut" -> "Image principale";

    "Titre du produit" -> "TF-IDF Vectorizer";
    "Prix de vente" -> "Normalisation + Imputation";
    "ASIN" -> "One-Hot Encoding";
    "Image principale" -> "Extraction visuelle - ResNet18";

    "TF-IDF Vectorizer" -> "Fusion des caractéristiques";
    "Normalisation + Imputation" -> "Fusion des caractéristiques";
    "One-Hot Encoding" -> "Fusion des caractéristiques";
    "Extraction visuelle - ResNet18" -> "Fusion des caractéristiques";

    "Fusion des caractéristiques" -> "Modèle prédictif";
    "Modèle prédictif" -> "Prédiction note produit";
    "Prédiction note produit" -> "Estimation risque de retour";
}
    `;
    const container = document.getElementById("flowchart");
    if(container) {
        container.innerHTML = Viz(dot, { format: "svg" });
    }
});
