import { useEffect, useState } from 'react';
import { adocoesBase, petsBase } from './data/relatorioData';

const API_BASE = 'http://localhost:3001';

async function buscarColecao(nomeColecao) {
  const response = await fetch(`${API_BASE}/${nomeColecao}`);
  if (!response.ok) {
    throw new Error(`Erro ao carregar ${nomeColecao}`);
  }

  return response.json();
}

export default function RelatorioAdocoes() {
  const [pets, setPets] = useState(petsBase);
  const [adocoes, setAdocoes] = useState(adocoesBase);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativo = true;

    async function carregarRelatorio() {
      try {
        setLoading(true);
        const [petsApi, adocoesApi] = await Promise.all([
          buscarColecao('pets'),
          buscarColecao('adocoes'),
        ]);

        if (!ativo) {
          return;
        }

        setPets(Array.isArray(petsApi) && petsApi.length > 0 ? petsApi : petsBase);
        setAdocoes(Array.isArray(adocoesApi) && adocoesApi.length > 0 ? adocoesApi : adocoesBase);
        setErro('');
      } catch (error) {
        if (!ativo) {
          return;
        }

        setPets(petsBase);
        setAdocoes(adocoesBase);
        setErro(
          'Nao foi possivel consultar o json-server. O relatorio esta usando os dados locais de fallback.',
        );
        console.error('Erro ao carregar relatorio:', error);
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    carregarRelatorio();

    return () => {
      ativo = false;
    };
  }, []);

  const relatorio = adocoes.map((adocao) => {
    const petRelacionado = pets.find((pet) => String(pet.id) === String(adocao.petId));

    return {
      ...adocao,
      nomePet: petRelacionado?.nome ?? 'Pet nao encontrado',
      tipoPet: petRelacionado?.tipo ?? petRelacionado?.especie ?? '-',
      idadePet: petRelacionado?.idade ?? '-',
      statusPet: petRelacionado?.status ?? '-',
    };
  });

  const totalRegistros = relatorio.length;
  const aprovadas = relatorio.filter((item) => item.status === 'Aprovada').length;

  return (
    <section style={{ marginTop: '32px' }}>
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div style={{ marginBottom: '18px' }}>
          <h2 style={{ margin: '0 0 8px', color: '#f59e0b' }}>Relatorio com JOIN</h2>
          <p style={{ margin: 0, color: '#4b5563', lineHeight: '1.6' }}>
            Relatorio de adocoes montado com JOIN entre as colecoes <strong>adocoes</strong> e{' '}
            <strong>pets</strong> do <strong>db.json</strong>, usando <strong>petId</strong> como
            chave estrangeira e <strong>map()</strong> + <strong>find()</strong> no React.
          </p>
        </div>

        {erro && (
          <div className="alert alert-warning" role="alert" style={{ marginBottom: '16px' }}>
            {erro}
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          <div style={{ backgroundColor: '#fff7ed', borderRadius: '12px', padding: '16px' }}>
            <strong style={{ display: 'block', color: '#9a3412' }}>Total de registros</strong>
            <span style={{ fontSize: '28px', color: '#c2410c' }}>
              {loading ? '...' : totalRegistros}
            </span>
          </div>
          <div style={{ backgroundColor: '#ecfeff', borderRadius: '12px', padding: '16px' }}>
            <strong style={{ display: 'block', color: '#155e75' }}>Adocoes aprovadas</strong>
            <span style={{ fontSize: '28px', color: '#0f766e' }}>
              {loading ? '...' : aprovadas}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '860px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>ID</th>
                  <th style={{ padding: '12px' }}>Adotante</th>
                  <th style={{ padding: '12px' }}>Cidade</th>
                  <th style={{ padding: '12px' }}>Pet</th>
                  <th style={{ padding: '12px' }}>Tipo</th>
                  <th style={{ padding: '12px' }}>Idade</th>
                  <th style={{ padding: '12px' }}>Status da adocao</th>
                  <th style={{ padding: '12px' }}>Status do pet</th>
                </tr>
              </thead>
              <tbody>
                {relatorio.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}>{item.id}</td>
                    <td style={{ padding: '12px' }}>{item.adotante}</td>
                    <td style={{ padding: '12px' }}>{item.cidade}</td>
                    <td style={{ padding: '12px' }}>{item.nomePet}</td>
                    <td style={{ padding: '12px' }}>{item.tipoPet}</td>
                    <td style={{ padding: '12px' }}>{item.idadePet}</td>
                    <td style={{ padding: '12px' }}>{item.status}</td>
                    <td style={{ padding: '12px' }}>{item.statusPet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
