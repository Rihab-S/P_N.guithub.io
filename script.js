const translations = {
    fr: {
        bio: "Ponera est le premier revendeur 100% dédié à la vente des marques sur Amazon et sur les Marketplaces. Dès le premier jour, nos experts achètent vos produits,  protègent votre marque et analysent le marché pour mettre en place une stratégie de croissance.",
        navPresentation: "Présentation",
        navDoc: "Documentation",
        navTest: "Test",
        links: {
            presentation: "Presentation_F.html",
            doc: "Documentation_F.html",
            test: "test_F.html"
        },
        footer: "© 2025 Rihab Souissi.",
        phrases: [
            "Ponera protège votre marque| sur Amazon",
            "Ponera augmente vos ventes| sur Amazon",
            "Ponera vend vos produits| sur Amazon"
        ]
    },
    en: {
        bio: "Ponera is the first retailer 100% dedicated to selling brands on Amazon and Marketplaces. From day one, our experts buy your products, protect your brand and analyze the market to implement a growth strategy.",
        navPresentation: "Presentation",
        navDoc: "Documentation",
        navTest: "Test",
        links: {
            presentation: "Presentation_A.html",
            doc: "Documentation_A.html",
            test: "test_A.html"
        },
        footer: "© 2025 Rihab Souissi.",
        phrases: [
            "Ponera protects your brand| on Amazon",
            "Ponera boosts your sales| on Amazon",
            "Ponera sells your products| on Amazon"
        ]
    }
};

function changeLanguage(lang) {
    document.getElementById("bio-text").textContent = translations[lang].bio;
    document.getElementById("nav-presentation").textContent = translations[lang].navPresentation;
    document.getElementById("nav-doc").textContent = translations[lang].navDoc;
    document.getElementById("nav-test").textContent = translations[lang].navTest;
    document.getElementById("footer-text").textContent = translations[lang].footer;

    document.getElementById("nav-presentation").setAttribute("href", translations[lang].links.presentation);
    document.getElementById("nav-doc").setAttribute("href", translations[lang].links.doc);
    document.getElementById("nav-test").setAttribute("href", translations[lang].links.test);

    localStorage.setItem("lang", lang);

    startTextAnimation(lang); // recharge les phrases de l’animation
}

window.onload = function () {
    const savedLang = localStorage.getItem("lang") || "fr";
    document.getElementById("lang-select").value = savedLang;
    changeLanguage(savedLang);
};

/* Animation de texte */
let animationInterval;

function startTextAnimation(lang) {
    clearTimeout(animationInterval);

    const textElement = document.getElementById("animated-text");
    const phrases = translations[lang].phrases;
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting) {
            textElement.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;

            if (letterIndex === currentPhrase.length) {
                isDeleting = true;
                animationInterval = setTimeout(typeEffect, 700);
                return;
            }
        } else {
            textElement.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;

            if (letterIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }
        animationInterval = setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    typeEffect();
}
