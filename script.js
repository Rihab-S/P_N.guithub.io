const translations = {
    fr: {
        bio: "Avec notre service innovant, obtenez l’évaluation de votre produit avant même sa mise en vente. Anticipez les besoins de vos clients, ajustez votre offre et maximisez vos ventes en toute sérénité. Rejoignez-nous dès aujourd’hui et transformez chaque lancement en une expérience réussie et confiante !",
        navPresentation: "Présentation",
        navDoc: "Documentation",
        navTest: "Test",
        navPre: "Perspectives",
        links: {
            presentation: "Presentation_F.html",
            doc: "Documentation_F.html",
            test: "test_F.html",
            Perspectives: "prespective_F.html"
        },
        footer: "© 2025 Rihab Souissi.",
        phrases: [
            "Redoutez-vous les retours de vos produits ?",
            "Ne laissez plus l’incertitude freiner votre succès !"
        ],
        welcome: "Bienvenue",
        project: "Découvrez nos projets, tests et documentations sur l’intelligence artificielle et les systèmes intelligents."
    },
    en: {
        bio: "With our innovative service, get your product evaluated even before it goes on sale. Anticipate your customers’ needs, adjust your offer, and maximize your sales with confidence. Join us today and turn every launch into a successful experience!",
        navPresentation: "Presentation",
        navDoc: "Documentation",
        navTest: "Test",
        navPre: "Perspectives",
        links: {
            presentation: "Presentation_A.html",
            doc: "Documentation_A.html",
            test: "test_A.html",
            Perspectives: "prespective_A.html"
        },
        footer: "© 2025 Rihab Souissi.",
        phrases: [
            "Worried about product returns?",
            "Don’t let uncertainty slow down your success!"
        ],
        welcome: "Welcome",
        project: "Discover our projects, tests, and documentation on artificial intelligence and intelligent systems."
    }


};

function changeLanguage(lang) {
    // Mettre à jour le contenu statique
    document.getElementById("bio-text").textContent = translations[lang].bio;
    document.getElementById("nav-presentation").textContent = translations[lang].navPresentation;
    document.getElementById("nav-doc").textContent = translations[lang].navDoc;
    document.getElementById("nav-test").textContent = translations[lang].navTest;
    document.getElementById("nav-pre").textContent = translations[lang].navPre;
    document.getElementById("footer-text").textContent = translations[lang].footer;

    document.getElementById("nav-presentation").setAttribute("href", translations[lang].links.presentation);
    document.getElementById("nav-doc").setAttribute("href", translations[lang].links.doc);
    document.getElementById("nav-test").setAttribute("href", translations[lang].links.test);
    document.getElementById("nav-pre").setAttribute("href", translations[lang].links.perspectives);

    document.getElementById("welcome-title").textContent = translations[lang].welcome;
    document.getElementById("project-text").textContent = translations[lang].project;

    localStorage.setItem("lang", lang);

    // Lancer ou relancer l'animation
    startTextAnimation(lang);
}

// Lancer la langue sauvegardée au chargement de la page
window.onload = function () {
    const savedLang = localStorage.getItem("lang") || "fr";
    changeLanguage(savedLang);
};

/* Animation de texte avec Ponera fixe */
let animationInterval;

function startTextAnimation(lang) {
    clearTimeout(animationInterval);

    const textElement = document.getElementById("animated-text");
    const phrases = translations[lang].phrases;

    const fixedPart = " "; // Texte fixe
    textElement.innerHTML = `<span class="fixed">${fixedPart}</span><span class="animated"></span>`;
    const animatedSpan = textElement.querySelector(".animated");

    // Calculer la phrase la plus longue pour largeur fixe
    const maxLength = Math.max(...phrases.map(p => p.length));
    textElement.style.width = `${fixedPart.length + maxLength}ch`;

    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        if (!isDeleting) {
            animatedSpan.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
            if (letterIndex === currentPhrase.length) {
                isDeleting = true;
                animationInterval = setTimeout(typeEffect, 700);
                return;
            }
        } else {
            animatedSpan.textContent = currentPhrase.substring(0, letterIndex - 1);
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
