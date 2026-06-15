import React from 'react';

export default function AdocaoForm({ 
  pets, petId, setPetId, nomeAdotante, setNomeAdotante, 
  status, setStatus, idEmEdicao, lidarComSalvar, limparFormulario 
}) {
  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h4 className="mb-3">{idEmEdicao ? '📝 Editar Registo de Adoção' : '➕ Novo Registo de Adoção'}</h4>
      <form onSubmit={lidarComSalvar}>
        <div className="row g-3">
          
          <div className="col-md-4">
            <label className="form-label fw-bold">Selecionar Pet *</label>
            <select className="form-select" value={petId} onChange={(e) => setPetId(e.target.value)}>
              <option value="">-- Escolha um Pet --</option>
              {pets.map(pet => (
                <option key={pet.id} value={pet.id}>{pet.nome} ({pet.especie})</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Nome do Adotante *</label>
            <input 
              type="text" className="form-control" placeholder="Nome completo" 
              value={nomeAdotante} onChange={(e) => setNomeAdotante(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold">Status do Processo</label>
            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pendente">Pendente</option>
              <option value="Em Análise">Em Análise</option>
              <option value="Aprovada">Aprovada</option>
              <option value="Rejeitada">Rejeitada</option>
            </select>
          </div>

        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-primary me-2">
            {idEmEdicao ? 'Atualizar Dados' : 'Gravar Adoção'}
          </button>
          {idEmEdicao && (
            <button type="button" className="btn btn-secondary" onClick={limparFormulario}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}