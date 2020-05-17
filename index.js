require('dotenv').config()

const express = require('express');
const app = express();

// Importa as rotas definidas no arquivo .routes deste mesmo diretório
const routes = require('./routes');

// Utiliza do middleware express.json() para parsear o body das requisições para o formato .json
app.use(express.json());

// Utiliza as nossas rotas criadas no outro arquivo como o proprio roteador do projeto
app.use(routes);

// Código do Pug
// app.set('view engine', 'pug');

// Renderização do Pug
// app.get('/', function(req, res){
//   res.render('index', {titleProduto: 'Sapataria Peter', message: 'Compre sapatos!'})
// })

app.listen(process.env.PORT || 3000, function(){
  console.log('Opa! O Servidor da Sapataria de Peter começou!')
})