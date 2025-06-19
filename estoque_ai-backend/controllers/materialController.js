const Material = require('../models/Material');
module.exports = {
  /**
  * Lista todos os materiais do catálogo
  */
  async listarMateriais(req, res) {
    try {
      const materiais = await Material.listar();
      res.json(materiais);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro ao listar materiais' });
    }
  },
  /**
  * Obtém detalhes de um material específico
  */
  async obterMaterial(req, res) {
    try {
      const { id } = req.params;
      const material = await Material.buscarPorId(id);
      if (!material) {
        return res.status(404).json({ erro: 'Material não encontrado' });
      }
      res.json(material);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro ao buscar material' });
    }
  }
};
