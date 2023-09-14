# Sujet 1 : Le démineur
### Réalisez votre implémentation du jeu du démineur en JS.
* Le joueur peut choisir un niveau de difficulté(facile, moyen, difficile) correspondant
à une taille de grille et un nombre de bombes.
* La grille se remplit aléatoirement en début de partie.
* Le joueur peut cliquer sur une case pour la déminer.
    * Le clic sur une bombe fait perdre la partie.
    * Le clic sur une zone vide la révèle ainsi que toutes les zones vides adjacentes.
    * Le clic sur une zone portant un numéro révèle ce numéro.
* Le joueur peut utiliser un drapeau pour identifier une bombe (clic droit par exemple). Une fois une zone marquée par un drapeau elle ne peut plus être révélée à moins d’enlever le drapeau.
* Une fois toutes les cases n’étant pas des bombes révélées, la partie est gagnée.
