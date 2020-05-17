const mongoose = require('mongoose');

// Conectando ao Banco de dados MongoDb

// Essas duas linhas de baixo fazem a mesma coisa
// 'thi'+ process.env.DB_URL +'ago'
// `thi${process.env.DB_URL}ago`
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology:true
}).catch(err => console.log('Err mongoose: ', err))

module.exports = mongoose;