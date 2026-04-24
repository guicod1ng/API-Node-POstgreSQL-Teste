const agendamentosService = require('../services/agendamentosService');

const listar = async (req, res) => {
  try {
    const agendamentos = await agendamentosService.listar(req.usuario.id);
    res.json(agendamentos);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar agendamentos' });
  }
};

const criar = async (req, res) => {
  try {
    const { cliente_id, data, hora, servico } = req.body;
    const usuario_id = req.usuario.id;

    if (!cliente_id || !data || !hora || !servico) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const novo = await agendamentosService.criar(cliente_id, data, hora, servico, usuario_id);

    if (!novo) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    res.status(201).json(novo);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar agendamento' });
  }
};

const excluir = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.usuario.id;

    const removido = await agendamentosService.excluir(id, usuario_id);

    if (!removido) {
      return res.status(404).json({ erro: 'Agendamento não encontrado' });
    }

    res.json({ mensagem: 'Agendamento cancelado', agendamento: removido });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao excluir agendamento' });
  }
};

module.exports = { listar, criar, excluir };