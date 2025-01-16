const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Base de dados fictícia
let items = [];

// Rotas CRUD

// Criar um novo item (Create)
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).jsono({ error: 'Name and description are required.'});
  }
  const newItem = { id: items.legth + 1, name, description };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Buscar item por ID (Read)
app.get('/items/:id', (req, res) => {
   const { id } = req.params;
   const { name, description } = req.body;
   const itemIndex = items.findIndex(i => i.id === parseInt(id));
   if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found.' });
   }
   if (!name || !description) {
    return res.status(400).json ({ error: 'Name and description are required.' });
   }
   items[itemIndex] = { id: parseInt(id), name, description };
   res.status(200).json(items[itemIndex]);
});

// Atualizar um item por ID (Update)
app.put('/items/:id', (req, res) => {
   const { id } = req.params;
   const { name, description } = req.body;
   const itemIndex = items.findIndex(i => i.id === parseInt(id));
   if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found.' });
   }
   if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required.' });
   }
   items[itemIndex] = { id: parseInt(id), name, description };
   res.status(200).json(items[itemIndex]);
   });

   // Excluir um item por ID (Delete)
   app.delete('/itenms/:id', (req, res) => {
    const { id } = req.params;
    const itemIndex = items.findIndex(i => i.id === parserInt(id));
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found.'});
   }
   items.splice(itemIndex, 1);
   res.status(204).send();
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`API rodando em https://localhost:$(port)`);
});