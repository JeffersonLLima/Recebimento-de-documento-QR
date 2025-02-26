const express = require('express');
const path = require('path');

const app = express();

// Definir o diretório onde estão os arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o arquivo HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Porta do servidor (usando Heroku ou uma porta local)
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
