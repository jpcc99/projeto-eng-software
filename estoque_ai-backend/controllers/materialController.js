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
  },

  /**
  * Cria um material na lista
  */
  async registrarMaterial(req, res) {
    try {
      const {
        id_material,
        nome,
        descricao,
        unidade_de_medida,
        estoque_min,
        estoque_max,
        status,
        codigo,
      } = req.body;
      // verifica se o material já existe
      const materialExistente = await Material.buscarPorId(id_material);
      if (materialExistente) {
        return res.status(400).json({ erro: 'Material já cadastrado' });
      }
      // Cria o material 
      const material = await Material.criar(
        id_material,
        nome,
        descricao,
        unidade_de_medida,
        estoque_min,
        estoque_max,
        status,
        codigo,
      );
      res.status(201).json(material);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro ao criar material' });
    }
  },

  /**
   * Altera material
   * TODO
  */
  async alterarMaterial(req, res) {
    try {
      const { id } = req.params;
      const material = await Material.buscarPorId(id);
      if (!material) {
        return res.status(404).json({ erro: 'Material não encontrado' });
      }
      res.json(material);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro ao alterar material' });
    }
  }
};
