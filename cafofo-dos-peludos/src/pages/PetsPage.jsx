import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001/pets';

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const navigate = useNavigate();

  // Verifica se usuario esta logado
  const usuarioLogado = localStorage.getItem('usuarioLogado') === 'true';

  useEffect(() => {
    carregarPets();
  }, []);

  const carregarPets = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao carregar');
      const dados = await response.json();
      setPets(dados);
      setErro('');
    } catch (error) {
      setErro('Erro ao carregar pets. O servidor esta rodando? (npm run server)');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja remover ${nome}?`)) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Erro ao deletar');
        
        setPets(pets.filter(pet => pet.id !== id));
        alert(`${nome} removido com sucesso!`);
      } catch (error) {
        alert('Erro ao remover pet.');
        console.error('Erro:', error);
      }
    }
  };

  const petsFiltrados = pets.filter(pet => {
    if (filtro === 'todos') return true;
    if (filtro === 'disponiveis') return pet.status === 'disponivel';
    if (filtro === 'cachorros') return pet.tipo === 'Cachorro';
    if (filtro === 'gatos') return pet.tipo === 'Gato';
    return true;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'disponivel': return <span className="badge bg-success px-3 py-2">Disponivel</span>;
      case 'adotado': return <span className="badge bg-warning text-dark px-3 py-2">Adotado</span>;
      case 'indisponivel': return <span className="badge bg-secondary px-3 py-2">Indisponivel</span>;
      default: return <span className="badge bg-info px-3 py-2">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3">Carregando pets...</p>
      </div>
    );
  }

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Pets para Adocao</h1>
          <p className="text-secondary">Encontre seu novo amigo</p>
        </div>
        <div className="d-flex gap-2">
          {/* Botao Novo Pet so aparece para admin logado */}
          {usuarioLogado && (
            <Link to="/pets/novo" className="btn btn-warning rounded-pill px-4">
              Novo Pet
            </Link>
          )}
          <button 
            className="btn btn-outline-secondary rounded-pill"
            onClick={carregarPets}
          >
            Atualizar
          </button>
        </div>
      </div>

      {erro && (
        <div className="alert alert-danger rounded-4 mb-4">
          {erro}
        </div>
      )}

      {/* Filtros */}
      <div className="mb-4">
        <div className="btn-group">
          <button 
            className={`btn ${filtro === 'todos' ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => setFiltro('todos')}
          >
            Todos ({pets.length})
          </button>
          <button 
            className={`btn ${filtro === 'disponiveis' ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => setFiltro('disponiveis')}
          >
            Disponiveis
          </button>
          <button 
            className={`btn ${filtro === 'cachorros' ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => setFiltro('cachorros')}
          >
            Cachorros
          </button>
          <button 
            className={`btn ${filtro === 'gatos' ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => setFiltro('gatos')}
          >
            Gatos
          </button>
        </div>
      </div>

      {/* Grid de Pets */}
      {petsFiltrados.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">Nenhum pet encontrado.</p>
          {usuarioLogado && (
            <Link to="/pets/novo" className="btn btn-warning rounded-pill">
              Cadastrar Primeiro Pet
            </Link>
          )}
        </div>
      ) : (
        <div className="row">
          {petsFiltrados.map(pet => (
            <div key={pet.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                {/* Imagem */}
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={pet.foto || 'https://via.placeholder.com/400x200?text=Sem+Foto'} 
                    alt={pet.nome}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    {getStatusBadge(pet.status)}
                  </div>
                </div>

                {/* Corpo do card */}
                <div className="card-body">
                  <h5 className="card-title mb-1">{pet.nome}</h5>
                  <p className="text-muted mb-2">
                    <small>{pet.tipo} - {pet.idade}</small>
                  </p>
                  <p className="card-text" style={{ fontSize: '14px' }}>
                    {pet.descricao}
                  </p>
                </div>

                {/* Botoes */}
                <div className="card-footer bg-white border-0 pb-3">
                  {/* Botao de adocao (sempre visivel) */}
                  {pet.status === 'disponivel' ? (
                    <Link 
                      to="/declaracao" 
                      className="btn btn-info btn-block rounded-pill mb-2"
                      style={{ width: '100%' }}
                    >
                      Quero Adotar
                    </Link>
                  ) : (
                    <button 
                      className="btn btn-secondary btn-block rounded-pill mb-2" 
                      style={{ width: '100%' }}
                      disabled
                    >
                      Indisponivel para adocao
                    </button>
                  )}
                  
                  {/* Botoes de admin (so aparece logado) */}
                  {usuarioLogado && (
                    <div className="d-flex gap-2 justify-content-center mt-2">
                      <button 
                        className="btn btn-outline-primary rounded-pill px-3"
                        onClick={() => navigate(`/pets/editar/${pet.id}`)}
                        title="Editar"
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-outline-danger rounded-pill px-3"
                        onClick={() => handleDelete(pet.id, pet.nome)}
                        title="Excluir"
                      >
                        Excluir
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Estatisticas (so admin ve) */}
      {usuarioLogado && (
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card bg-warning text-dark border-0 shadow-sm" style={{ borderRadius: '16px' }}>
              <div className="card-body text-center">
                <h3>{pets.length}</h3>
                <p className="mb-0 fw-bold">Total de Pets</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white border-0 shadow-sm" style={{ borderRadius: '16px' }}>
              <div className="card-body text-center">
                <h3>{pets.filter(p => p.status === 'disponivel').length}</h3>
                <p className="mb-0 fw-bold">Disponiveis</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-info text-white border-0 shadow-sm" style={{ borderRadius: '16px' }}>
              <div className="card-body text-center">
                <h3>{pets.filter(p => p.status === 'adotado').length}</h3>
                <p className="mb-0 fw-bold">Adotados</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}