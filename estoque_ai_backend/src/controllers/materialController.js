const { Material, UnidadeDeMedida } = require('../models/Material');
const ApiResponse = require('../utils/apiResponse');

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

    const { nome, descricao, unidade_medida, codigoproduto: codigo_material } = req.body;

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
      console.error(result.message);
      return res.status(result.statusCode || 404).json(ApiResponse.error("Não foi possível listar materiais"));
    }
    return res.status(result.statusCode || 200).json(result);
  }
}

module.exports = MaterialController;
