const { Material, UnidadeDeMedida } = require('../models/Material');
const ApiResponse = require('../utils/apiResponse');
const camposFaltando = require = require('../utils/camposFaltando');

class MaterialController {
  static async criar(req, res) {

    const camposNecessarios = ['nome', 'descricao', 'unidade_medida', 'codigo_produto'];
    const camposFaltando = [];

    for (const campo of camposNecessarios) {
      if (!(campo in req.body)) {
        camposFaltando.push(campo);
      }
    }

    if (camposFaltando.length > 0) {
      return res.json(ApiResponse.error(`Campos Necessarios Faltando: ${camposFaltando}`, 401));
    }

    const { nome, descricao, unidade_medida, codigo_material } = req.body;

    // TODO add checks para cada campo
    // TODO add e cacl estoque_max & estoque_min
    const result =
      await Material.criar(nome, descricao, unidade_medida, codigo_material);
    if (!result.success) {
      console.error(result.message);
      return res.status(result.statusCode || 401).json(ApiResponse.error("Erro ao criar material"));
    }
    return res.status(result.statusCode || 200).json(result);
  }

  static async listar(req, res) {
    const result = await Material.listar();
    /** TODO
      * Limitar informações de materiais listados a depender do tipo 
      * de Usuario
      */
    if (!result.success) {
      return res.status(result.statusCode || 404).json(ApiResponse.error("Não foi possível listar materiais"));
    }
    return res.status(result.statusCode || 200).json(result);
  }

  static async buscar(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json(ApiResponse.error("Não foi possível encontrar material", 404));
    }
    try {
      const result = await Material.buscarPorId(id);
      if (!result.success) {
        return res.status(404).json(ApiResponse.error("Não foi possível encontrar material", 404));
      }
      return res.status(200).json(result.data);
    } catch (err) {
      console.error(err.message);
      return res.status(404).json(ApiResponse.error("Não foi possível encontrar material", 404));
    }
  }

  static async atualizar(req, res) {
    const { id } = req.params;
    let result = await camposFaltando(['id', 'nome', 'descricao', 'unidade_de_medida'], req.body);
    if (!id || !result) {
      return res.status(500).json(ApiResponse.error("Não foi possível atualizar material", 500));
    }
    const { nome, descricao, unidade_de_medida } = req.body;
    try {
      result = await Material.atualizar(id, nome, descricao, unidade_de_medida);
      if (!result) {
        throw Error(result.message);
      }
      return res.status(201).json(result.message);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json(ApiResponse.error("Não foi possível atualizar material", 500));
    }
  }

  static async remover(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(500).json(ApiResponse.error("Não foi possível remover material", 500));
    }
    try {
      const result = await Material.remover(id);
      return res.status(201).json(result.message);
    } catch (err) {
      console.error
    }
  }
}

module.exports = MaterialController;
