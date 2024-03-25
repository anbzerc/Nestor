Modèles possibles :
- whisper-large-french (distil) https://huggingface.co/bofenghuang/whisper-large-v3-french
- whisper-large-french en float 16(distil) https://huggingface.co/bofenghuang/whisper-large-v3-french

Architecture :

Pour l'instant la méthode pour ajouter des actions va être d'ajouter le libellé au actions_list.json / actions.ini
pour que ce soit ajouté dans la liste d'actions possible proposée au modèle mistral. Il faudra aussi (ça va être un peu
bricolé mais ça ira le temps de faire potentiellement un vrai système de plugins) ajouter au fichier actions.py la fonction
qui réalise la dite action (des fichiers complémentaires peuvent être rajoutés dans Plugins/le_nom_du_plugin/ )

