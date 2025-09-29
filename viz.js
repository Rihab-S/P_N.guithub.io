<!-- Ajouter viz.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/viz.js/2.1.2/viz.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/viz.js/2.1.2/full.render.js"></script>

<div id="flowchart" style="text-align:center;"></div>

<script>
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
  document.getElementById("flowchart").innerHTML = Viz(dot, { format: "svg" });
</script>
