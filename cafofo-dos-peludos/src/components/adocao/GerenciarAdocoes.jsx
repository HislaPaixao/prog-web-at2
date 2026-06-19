import { useState, useEffect } from 'react';

const ADOCOES_API = 'http://localhost:3001/adocoes';
const PETS_API = 'http://localhost:3001/pets';

export default function GerenciarAdocoes() {
  const [adocoes, setAdocoes] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [statusEdit, setStatusEdit] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [resAdocoes, resPets] = await Promise.all([
        fetch(ADOCOES_API),
        fetch(PETS_API)
      ]);

      if (!resAdocoes.ok || !resPets.ok) throw new Error('Erro ao carregar');

      const dadosAdocoes = await resAdocoes.json();
      const dadosPets = await resPets.json();

      // Faz o JOIN entre adocoes e pets
      const adocoesCompletas = dadosAdocoes.map(adocao => {
        const pet = dadosPets.find(p => p.id == adocao.petId);
        return {
          ...adocao,
          nomePet: pet ? pet.nome : 'Pet nao encontrado',
          especiePet: pet ? pet.tipo : '-',
          idadePet: pet ? pet.idade : '-'
        };
      });

      setAdocoes(adocoesCompletas);
      setPets(dadosPets);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const iniciarEdicao = (adocao) => {
    setEditando(adocao.id);
    setStatusEdit(adocao.status);
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setStatusEdit('');
  };

  const salvarEdicao = async (adocao) => {
    try {
      const adocaoAtualizada = { ...adocao, status: statusEdit };

      const response = await fetch(`${ADOCOES_API}/${adocao.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adocaoAtualizada)
      });

      if (!response.ok) throw new Error('Erro ao atualizar');

      // Se aprovada, atualiza status do pet para 'adotado'
      if (statusEdit === 'Aprovada') {
        const pet = pets.find(p => p.id == adocao.petId);
        if (pet) {
          await fetch(`${PETS_API}/${adocao.petId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'adotado' })
          });
        }
      }

      // Se rejeitada, volta pet para 'disponivel'
      if (statusEdit === 'Rejeitada') {
        const pet = pets.find(p => p.id == adocao.petId);
        if (pet && pet.status === 'adotado') {
          await fetch(`${PETS_API}/${adocao.petId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'disponivel' })
          });
        }
      }

      setAdocoes(adocoes.map(a => a.id === adocao.id ? adocaoAtualizada : a));
      setEditando(null);
      alert('Adocao atualizada com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar adocao.');
      console.error('Erro:', error);
    }
  };

  const eliminarAdocao = async (id) => {
    if (window.confirm('Tem certeza que deseja eliminar esta adocao?')) {
      try {
        const adocao = adocoes.find(a => a.id === id);

        await fetch(`${ADOCOES_API}/${id}`, { method: 'DELETE' });

        // Volta o pet para disponivel se estava adotado
        if (adocao && adocao.status === 'Aprovada') {
          await fetch(`${PETS_API}/${adocao.petId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'disponivel' })
          });
        }

        setAdocoes(adocoes.filter(a => a.id !== id));
        alert('Adocao eliminada com sucesso!');
      } catch (error) {
        alert('Erro ao eliminar adocao.');
        console.error('Erro:', error);
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Aprovada': 'bg-success',
      'Rejeitada': 'bg-danger',
      'Em analise': 'bg-info',
      'Entrevista agendada': 'bg-primary',
      'Pendente': 'bg-warning text-dark'
    };
    const classe = statusMap[status] || 'bg-secondary';
    return <span className={`badge ${classe}`}>{status}</span>;
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-warning" role="status" />
        <p className="mt-2">Carregando adocoes...</p>
      </div>
    );
  }

  return (
    <div className="card p-4 shadow-sm mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Listagem e Relatorio de Adocoes</h4>
        <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={carregarDados}>
          Atualizar
        </button>
      </div>

      {adocoes.length === 0 ? (
        <p className="text-muted">Nenhuma adocao registada.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Pet</th>
                <th>Especie</th>
                <th>Idade</th>
                <th>Adotante</th>
                <th>Status</th>
                <th className="text-center">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {adocoes.map((item) => (
                <tr key={item.id}>
                  <td>{item.nomePet}</td>
                  <td>{item.especiePet}</td>
                  <td>{item.idadePet}</td>
                  <td>{item.adotante || '-'}</td>
                  <td>
                    {editando === item.id ? (
                      <select
                        className="form-select form-select-sm"
                        value={statusEdit}
                        onChange={(e) => setStatusEdit(e.target.value)}
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Em analise">Em analise</option>
                        <option value="Entrevista agendada">Entrevista agendada</option>
                        <option value="Aprovada">Aprovada</option>
                        <option value="Rejeitada">Rejeitada</option>
                      </select>
                    ) : (
                      getStatusBadge(item.status)
                    )}
                  </td>
                  <td className="text-center">
                    {editando === item.id ? (
                      <>
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => salvarEdicao(item)}
                        >
                          Salvar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={cancelarEdicao}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-sm btn-outline-warning me-2"
                          onClick={() => iniciarEdicao(item)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => eliminarAdocao(item.id)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}