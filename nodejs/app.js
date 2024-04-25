const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Utilisez CORS middleware
app.use(cors({
    origin: 'http://127.0.0.1:3000',
    methods: 'GET,POST,OPTIONS,HEAD',
    allowedHeaders: 'Content-Type,Authorization'
  }));

// Servez les fichiers statiques depuis le dossier 'public'
app.use(express.static('public'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/main.html'));
});
app.get('*', (req, res) => {
    res.status(404).send('Page non trouvée');
});
app.listen(PORT, () => {
    
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

