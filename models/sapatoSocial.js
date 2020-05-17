// Acessando ao nosso mongoose já conectado
const mongoose = require('../config/database');

// Criando um novo Schema para o nosso Produto
const SapatoSocialSchema = mongoose.Schema(
  {
    nome:{
      type: String,
      required: true
    },
    cor:{
      type: String,
      enum: ['Preto', 'Marrom Escuro', 'Marrom Claro', 'Bege'],
      },
    preco:{
      type: Number,
      min: 1,
      max: 1000
    },
    marca:{
        type: String,
        enum: ['Sergio K', 'Borelli', 'Luidgi']
    }
  }
);

// Criando um novo modelo baseado 'Product' baseado no Schema do nosso Produto
const SapatoSocialModel = mongoose.model('Sapato-Social', SapatoSocialSchema);

// Exportando o nosso Modelo do Produto
module.exports = SapatoSocialModel;