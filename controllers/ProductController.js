// Requisitando o modelo do nosso Produto, com já acesso ao banco de dados
const productModel = require('../models/product');

// Classe de Controller do Produto, com os controllers utilizados nas rotas
class ProductController{
  
  // Pega o parâmetro id da requisição get
  // Procura um Produto no nosso banco de dados com o id passado a função
  // Retorna o Produto como json para quem requisitou
  async get(req, res){
    const { id } = req.params;
    const product = await productModel.findById(id);
    res.json(product);
  }

  // Essa função retorna todos os produtos que derem um match com o body passado
  // pela requisição
  async getFiltered(req, res){
    const body = req.body;
    const products = await productModel.find(body);
    res.json(products);
  }

  // Recebe um produto no formato json via body da requisição
  // Cria um novo produto baseado no modelo do produto
  // Retorna o Produto criado, ou seja, o próprio req.body + uma nova propriedade de id gerada pelo MongoDB
  async put(req, res){
    try{
      const body = req.body;

      // Validação antes da criação, sem a validação padrão do Mongoose
      // if(body["nome"] == undefined){
      //   res.status(400).send('Para criar um produto tem que ter o atributo nome')
      // }
      // if(body["preco"] < 0){
      //   res.status(400).send('Para criar um produto tem que ter o preco maior do que 0')
      // }
      // if(typeof body["cor"] != "string"){
      //   res.status(400).send('Para criar um produto tem que ter a cor no formato de string')
      // }
      const product = await productModel.create(body);
      res.json(product);
    } catch (error){
      console.log(error);
      res.status(400).json(error);
    }
    
  }

  // Rota para atualização de algum produto, baseado no id
  // Utiliza o id passado como parâmetro de rota
  // Pesquisa um produto por id e atualiza todo os seus valores pelo novo req.body
  async post(req, res){
    const { id } = req.params;
    const body = req.body;
    const product = await productModel.findByIdAndUpdate(id, req.body, {new: true});
    res.json(product);
  }

  // Remove um elemento do banco de dados, baseado no id passado
  async delete(req, res){
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    res.json({msg: "Esse produto foi deletetado"});
  }

}

// Exporta uma nova instância do produto
module.exports = new ProductController();