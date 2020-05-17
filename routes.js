// Importamos o componente router do express
// Adicionamos controladores as diferentes tipos de rotas criadas
// Importamos o ProductController desenvolvido, que tem acesso ao nosso model

const routes = require('express').Router()
const ProductController = require('./controllers/ProductController');
const SapatoSocialController = require('./controllers/SapatoSocial');
const UserController = require('./controllers/UserController');

const passport = require('passport')

// Rotas de Auth
routes.post('/login', UserController.login) // Se autentica e recebe jwt de volta
routes.post('/register', UserController.register) // Cria conta no banco de dados

// Rota acessível com login
routes.use('/home/:id', passport.authenticate('jwt', { session: false }), UserController.authorization, UserController.home)
routes.use('/home', passport.authenticate('jwt', { session: false }), UserController.home);

// Rotas Sapato Social
routes.get('/sapato', SapatoSocialController.getFiltered)
routes.get('/sapato/:id', SapatoSocialController.get)
routes.post('/sapato/:id', SapatoSocialController.post)
routes.put('/sapato', SapatoSocialController.put)
routes.delete('/sapato/:id', SapatoSocialController.delete)

// Rotas Produto Genérico
routes.get('/getFiltered', ProductController.getFiltered)
routes.get('/:id', ProductController.get)
routes.post('/:id', ProductController.post)
routes.put('/', ProductController.put)
routes.delete('/:id', ProductController.delete)

routes.get('/', UserController.home)

// Exportamos as definições das rotas
module.exports = routes;