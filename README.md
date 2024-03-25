# Nestor
## Installation 
#### Installation des dépendances python
```pip install ...```
#### Clonage du repository github
```git clone ...```

## Modèles disponibles
- Whisper-large-french by [bofenghuang](https://huggingface.co/bofenghuang/whisper-large-v3-french)
- Whisper-large-french-dec16 by [bofenghuang](https://huggingface.co/bofenghuang/whisper-large-v3-french-distil-dec16)
## Architecture
Pour l'instant la méthode pour ajouter des actions va être d'ajouter le libellé au actions_list.json / actions.ini 
pour que ce soit ajouté dans la liste d'actions possible proposée au modèle mistral. Il faudra aussi (ça va être un peu
bricolé mais ça ira le temps de faire potentiellement un vrai système de plugins) ajouter au fichier actions.py la fonction
qui réalise la dite action (des fichiers complémentaires peuvent être rajoutés dans Plugins/le_nom_du_plugin/ )
### Dev des plugins
- utiliser subprocess avec verification du résultat et timeout
- utiliser la fonction maison verbose pour les prints non nécessaires
## To Do :
1. [ ] Système de plugins robuste (pdf dans le dossier principal)
2. [ ] Système de nommage de plugins cool
3. [ ] (Vraiment plus tard) package pip
4. [ ] Interface graphique pour paramétrer les logiciels et avoir leurs chemins d'accès (genre lancer musique -> Deezer)
5. [ ] quand ça sera plus en prod gérer du verbose ou non

### Projets utilisés :
