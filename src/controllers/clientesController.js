const clientesService = require('../services/clientesService');

const listar = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const clientes = await clientesService.listar(usuario_id);
    res.json(clientes);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar clientes' });
  }
};

const criar = async (req, res) => {
  try {
    const { nome, telefone } = req.body;
    const usuario_id = req.usuario.id;

    if (!nome || !telefone) {
      return res.status(400).json({ erro: 'Nome e telefone são obrigatórios' });
    }

    const novoCliente = await clientesService.criar(nome, telefone, usuario_id);
    res.status(201).json(novoCliente);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao salvar cliente' });
  }
};

const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone } = req.body;
    const usuario_id = req.usuario.id;

    if (!nome || !telefone) {
      return res.status(400).json({ erro: 'Nome e telefone são obrigatórios' });
    }

    const clienteAtualizado = await clientesService.atualizar(id, nome, telefone, usuario_id);

    if (!clienteAtualizado) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    res.json({ mensagem: 'Cliente atualizado com sucesso', cliente: clienteAtualizado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar cliente' });
  }
};

const deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.usuario.id;

    const clienteDeletado = await clientesService.deletar(id, usuario_id);

    if (!clienteDeletado) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    res.json({ mensagem: 'Cliente deletado com sucesso', cliente: clienteDeletado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar cliente' });
  }
};

module.exports = { listar, criar, atualizar, deletar };