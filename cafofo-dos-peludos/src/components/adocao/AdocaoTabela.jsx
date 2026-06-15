import React from 'react';

export default function AdocaoTabela({ relatorio, iniciarEdicao, eliminarAdocao }) {
  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">📋 Listagem e Relatório de Adoções</h4>
      {relatorio.length === 0 ? (
        <p className="text-muted">Nenhuma adoção registada.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Pet</th>
                <th>Espécie</th>
                <th>Idade</th>
                <th>Adotante</th>
                <th>Status</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {relatorio.map((item) => (
                <tr key={item.id}>
                  <td>{item.nomePet}</td>
                  <td>{item.especiePet}</td>
                  <td>{item.idadePet}</td>
                  <td>{item.nomeAdotante || item.adotante || '-'}</td>
                  <td>
                    <span className={`badge ${
                      item.status === 'Aprovada' ? 'bg-success' : 
                      item.status === 'Rejeitada' ? 'bg-danger' : 'bg-warning text-dark'
                    }`}>
                      {item.status || 'Pendente'}
                    </span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-outline-warning me-2" onClick={() => iniciarEdicao(item)}>
                      Editar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarAdocao(item.id)}>
                      Eliminar
                    </button>
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