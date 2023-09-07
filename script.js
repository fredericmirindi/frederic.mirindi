// Cela attend que le document HTML soit complètement chargé
document.addEventListener("DOMContentLoaded", function () {
    // Votre code JavaScript va ici

    // Exemple : Change la couleur de fond du corps de la page
    document.body.style.backgroundColor = "lightblue";

    // Exemple : Affiche une alerte lorsque l'utilisateur clique sur un bouton
    var monBouton = document.getElementById("monBouton");
    monBouton.addEventListener("click", function () {
        alert("Bouton cliqué !");
    });
});
