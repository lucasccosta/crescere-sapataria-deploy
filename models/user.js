// Acessando ao nosso mongoose já conectado
const mongoose = require('../config/database');
const bcrypt = require('bcrypt');

// Criando um novo Schema para o nosso Produto
const UserSchema = mongoose.Schema(
  {
    name:{
      type: String,
      required: true
    },
    password:{
      type: String,
      required: true,
    },
    email:{
      type: String,
      unique: true,
      required: true
    },
    role:{
      type: String,
      enum: ['admin', 'common'],
      required: true
    }
  }
);

UserSchema.method('compare', async(formPass, userPass) => {
  return bcrypt.compare(formPass, userPass)
})

// Criando um novo modelo baseado 'Product' baseado no Schema do nosso Produto
const UserModel = mongoose.model('User', UserSchema);

// Exportando o nosso Modelo do Produto
module.exports = UserModel;