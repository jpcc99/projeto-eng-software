const Usuario = require('../models/Usuario')

module.exports = {
  /**
  * Registra um novo usuário no sistema
  */
  async registrar(req, res) {
    try {
      const { matricula, nome, cpf, email, senha, tipo } = req.body;
      // Verifica se usuário já existe
      const usuarioExistente = await Usuario.buscarPorMatricula(matricula);
      if (usuarioExistente) {
        return res.status(400).json({ erro: 'Matrícula já cadastrada' });
      }
      // Cria o usuário (sem hash de senha para protótipo)
      const usuario = await Usuario.criar(matricula, nome, cpf, email, senha, true, tipo);
      res.status(201).json(usuario);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro ao registrar usuário' });
    }
  },

  /**
  * Realiza o login do usuário (simplificado para protótipo)
  */
  async login(req, res) {
    try {
      const { matricula, senha } = req.body;
      // Busca usuário
      const usuario = await Usuario.buscarPorMatricula(matricula);
      if (!usuario) {
        return res.status(401).json({ erro: 'Matrícula ou senha inválidos' });
      }
      // Verifica senha (sem hash para protótipo)
      if (usuario.senha !== senha) {
        return res.status(401).json({ erro: 'Matrícula ou senha inválidos' });
      }
      // Retorna dados básicos do usuário (em produção, retornaria um token JWT)
      const { senha: _, ...usuarioSemSenha } = usuario;
      res.json(usuarioSemSenha);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro ao realizar login' });
    }
  }
};
