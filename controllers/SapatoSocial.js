// Requisitando o modelo do nosso Produto, com já acesso ao banco de dados
const sapatoSocialModel = require('../models/sapatoSocial');

// Classe de Controller do Produto, com os controllers utilizados nas rotas
class SapatoSocialController{
  
  async get(req, res){
    const { id } = req.params;
    const sapatoSocial = await sapatoSocialModel.findById(id);
    res.json(sapatoSocial);
  }

  async getFiltered(req, res){
    const body = req.body;
    const sapatoSocial = await sapatoSocialModel.find(body);
    res.json(sapatoSocial);
  }
  async put(req, res){
    try{
      const body = req.body;
      const sapatoSocial = await sapatoSocialModel.create(body);
      res.json(sapatoSocial);
    } catch (error){
      console.log(error);
      res.status(400).json(error);
    }
    
  }  async post(req, res){
    const { id } = req.params;
    const body = req.body;
    const sapatoSocial = await sapatoSocialModel.findByIdAndUpdate(id, req.body, {new: true});
    res.json(sapatoSocial);
  }

  async delete(req, res){
    const { id } = req.params;
    const sapatoSocial = await sapatoSocialModel.findByIdAndDelete(id);
    res.json({msg: "Esse produto foi deletetado"});
  }

}
module.exports = new SapatoSocialController();