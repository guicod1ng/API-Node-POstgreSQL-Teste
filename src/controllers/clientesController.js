const clientesService = require('../services/clientesService');

// Listar todos
const listar = async (req, res) => {
  try {
    const clientes = await clientesService.listar();
    res.json(clientes);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar clientes' });
  }
};

// Criar
const criar = async (req, res) => {
  try {
    const { nome, telefone } = req.body;

  if (!nome || !telefone) {
    return res.status(400).json({ erro: 'Nome e telefone são obrigatórios' });
  }

  const novoCliente = await clientesService.criar(nome, telefone);

  res.status(201).json(novoCliente);
} catch (erro) {
  res.status(500).json({ erro: 'Erro ao salvar cliente' });
}
};

// Atualizar
const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone } = req.body;

    if (!nome || !telefone) {
      return res.status(400).json({ erro: 'Nome e telefone são obrigatórios' });
    }

    const clienteAtualizado = await clientesService.atualizar(id, nome, telefone);

    if (!clienteAtualizado) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    res.json({ mensagem: 'Cliente atualizado com sucesso', cliente: clienteAtualizado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar cliente' });
  }
};

// Deletar
const deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteDeletado = await clientesService.deletar(id);

    if (!clienteDeletado) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    res.json({ mensagem: 'Cliente deletado com sucesso', cliente: clienteDeletado });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar cliente' });
  }
};

module.exports = { listar, criar, atualizar, deletar };