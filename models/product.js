// Acessando ao nosso mongoose já conectado
const mongoose = require('../config/database');

// Criando um novo Schema para o nosso Produto
const ProductSchema = mongoose.Schema(
  {
    nome:{
      type: String,
      required: true
    },
    cor:{
      type: String,
      enum: ['Vermelho', 'Amarelo', 'Azul'],
      //required: function(){
        //return this.preco > 10
      },
    preco:{
      type: Number,
      min: 1,
      max: 1000
    }
  }
);

// Criando um novo modelo baseado 'Product' baseado no Schema do nosso Produto
const ProductModel = mongoose.model('Product', ProductSchema);

// Exportando o nosso Modelo do Produto
module.exports = ProductModel;