import { adocoesBase, petsBase } from './data/relatorioData';

function lerListaLocalStorage(chave, listaPadrao) {
  try {
    const valor = localStorage.getItem(chave);
    if (!valor) {
      return listaPadrao;
    }

    const lista = JSON.parse(valor);
    return Array.isArray(lista) && lista.length > 0 ? lista : listaPadrao;
  } catch {
    return listaPadrao;
  }
}

export default function RelatorioAdocoes() {
  const pets = lerListaLocalStorage('pets', petsBase);
  const adocoes = lerListaLocalStorage('adocoes', adocoesBase);

  const relatorio = adocoes.map((adocao) => {
    const petRelacionado = pets.find((pet) => pet.id === adocao.petId);

    return {
      ...adocao,
      nomePet: petRelacionado?.nome ?? 'Pet nao encontrado',
      especiePet: petRelacionado?.especie ?? '-',
      idadePet: petRelacionado?.idade ?? '-',
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
            Relatorio de adocoes montado com JOIN simulado entre as entidades{' '}
            <strong>Adocoes</strong> e <strong>Pets</strong>, usando <strong>petId</strong>{' '}
            como chave estrangeira e <strong>map()</strong> + <strong>find()</strong> no React.
          </p>
        </div>

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
            <span style={{ fontSize: '28px', color: '#c2410c' }}>{totalRegistros}</span>
          </div>
          <div style={{ backgroundColor: '#ecfeff', borderRadius: '12px', padding: '16px' }}>
            <strong style={{ display: 'block', color: '#155e75' }}>Adocoes aprovadas</strong>
            <span style={{ fontSize: '28px', color: '#0f766e' }}>{aprovadas}</span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>Adotante</th>
                <th style={{ padding: '12px' }}>Cidade</th>
                <th style={{ padding: '12px' }}>Pet</th>
                <th style={{ padding: '12px' }}>Especie</th>
                <th style={{ padding: '12px' }}>Idade</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {relatorio.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>{item.id}</td>
                  <td style={{ padding: '12px' }}>{item.adotante}</td>
                  <td style={{ padding: '12px' }}>{item.cidade}</td>
                  <td style={{ padding: '12px' }}>{item.nomePet}</td>
                  <td style={{ padding: '12px' }}>{item.especiePet}</td>
                  <td style={{ padding: '12px' }}>{item.idadePet}</td>
                  <td style={{ padding: '12px' }}>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
