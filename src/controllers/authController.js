const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuariosService = require('../services/usuariosService');

// Chave secreta (depois migra para .env)
const { JWT_SECRET } = require('../config/env');
// Registrar novo usuário
const registrar = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }

    // Verificar se email já existe
    const usuarioExistente = await usuariosService.buscarPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    // Criptografar senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Salvar no banco
    const novoUsuario = await usuariosService.criar(email, senhaHash);

    res.status(201).json({ mensagem: 'Usuário criado com sucesso', usuario: novoUsuario });
  } catch (erro) {
    console.log('ERRO NO REGISTRO:', erro);
    res.status(500).json({ erro: 'Erro ao registrar usuário' });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }

    // Buscar usuário
    const usuario = await usuariosService.buscarPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    // Comparar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    // Gerar token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ mensagem: 'Login realizado com sucesso', token });
  } catch (erro) {
    console.log('ERRO NO LOGIN:', erro);
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};

module.exports = { registrar, login };