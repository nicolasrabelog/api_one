const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configurar o body-parser para lidar com JSON
app.use(bodyParser.json());

// Configurar a conexçao com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Substitua pela senha do seu banco de dados
    database: 'meu_banco_de_dados' // Substitua pelo nome do seu banco de dados
});

// Conectar ao banco de dados
db.connect((err) => {
   if (err) {
    console.error('Erro ao conectar ao banco de dados: ', err);
    process.exit(1);
   }
   console.log('Conectando ao banco de dados MySQL!');

});

// Rotas da API


// 1. Criar um novo produto
app.post('/produtos', (req, res) => {
    const { nome, descricao, preco, estoque } = req.body;
    if (!nome || !preco || estoque === undefined) {
      return res.status(400).json({ message: 'Os campos nome, preco e estoque são obrigatórios.'});
    }

    const sql = 'INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, descricao, preco, estoque], (err, result) => {
       if (err) {
        console.error('Erro ao inserir produto:', err);
        return res.status(500).json({ message: 'Erro ao inserir produto.'}) 
    }
    res.status(201).json({ message: 'Produto criado com sucesso!', produtoId: result.insertId });
  });

  // 2. Obter todos os produtos
  app.get('/produtos', (req, res) => {
     const sql = 'SELECT * FROM produtos';
     db.query(sql, (err, results) => {
        if (err) {
        console.error('Erro ao buscar produtos:', err);
        return res.status(500).json({ message: 'Erro ao buscar produtos.' }); 
        }
        res.status(200).json(results);
       });  
     });

// 3. Obter um único produto pelo ID
app.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM produtos WHERE id = ?';
    db.query(sql, [id], (err, results) => {
       if (err) {
          console.error('Erro ao buscar produto:', err);
          return res.status(500).json({ message: 'Erro ao buscar produto.' });
       }
       if (results.length === 0) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
       }
       res.status(200).json(results[0]);
    });
});

// 4. Atualizar um produto pelo ID
app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, estoque } = req.body;

    if (!nome || ! preço || estoque === underfined) {
        return res.status(400).json({ message: 'Os campos nome, preco e estoque são obrigatórios.' });
    }

    const sql = 'UPDATE produtos SET nome = ?, descricao = ? preco = ?, estoque = ? WHERE id = ?';
    db.query(sql, [nome, descricao, preco, estoque, id], (err, result) => {
       if (err) {
           console.error('Erro ao atualizar produto', err);
           return res.status(500).json({ message: 'Erro ao atualizar produto.' });
    }
    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Produto não encontrado.'});
    }
    res.status(200).json({ message: 'Produto atualizado com sucesso!' });

    });
});

// 5. Excluir um produto pelo ID
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM  produtos  WHERE id = ?';
    db.query(sql, [id], (err, result) => {
       if (err) {
        console.error('Erro ao excluir produto', err);
        return res.status(500).json({ message: 'Erro ao excluir produto.' });
    }
    if (result.affectedRows === 0) {
        return res.status(404).json ({ message: 'Produto não encontrado.' });
    }
    res.status(200).json({ message: 'Produto excluido com sucesso!' });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em https://localhost:$(port)`);
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
