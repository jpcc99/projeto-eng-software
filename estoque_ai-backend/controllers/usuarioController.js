const Usuario = require('../models/Usuario');
module.exports = {
  /**
  * Obtém informações de um usuário
  */
  async obterUsuario(req, res) {
    try {
      const { matricula } = req.params;
      const usuario = await Usuario.buscarPorMatricula(matricula);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      // Remove a senha do retorno
      const { senha: _, ...usuarioSemSenha } = usuario;
      res.json(usuarioSemSenha);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
  }
};
