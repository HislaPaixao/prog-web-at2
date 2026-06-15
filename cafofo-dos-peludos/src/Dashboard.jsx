import { useNavigate } from 'react-router-dom';
import RelatorioAdocoes from './RelatorioAdocoes';
import UsersCrud from './UsersCrud';

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    alert('Sessao encerrada!');
    onLogout();
    navigate('/');
  };

  return (
    <div
      style={{
        backgroundColor: '#f3f4f6',
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <nav
        style={{
          backgroundColor: '#212529',
          padding: '15px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/img/logo1.png"
            alt="Logo Cafofo"
            style={{
              maxHeight: '40px',
              marginRight: '12px',
              backgroundColor: 'white',
              borderRadius: '6px',
              padding: '3px',
            }}
          />
          <span
            style={{
              color: 'orange',
              fontSize: '24px',
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 'bold',
            }}
          >
            Cafofo Admin
          </span>
        </div>

        <div>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc3545',
              color: '#ffffff',
              borderRadius: '8px',
              fontWeight: 'bold',
              padding: '10px 24px',
              fontSize: '15px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            }}
          >
            Sair / Logout
          </button>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '50px', paddingLeft: '20px', paddingRight: '20px' }}>
        <div className="card p-5 border-0 shadow-sm text-center" style={{ borderRadius: '16px', backgroundColor: '#ffffff' }}>
          <h1 className="display-4 mb-3" style={{ color: 'orange', fontFamily: "'Baloo 2', cursive" }}>
            Bem-vindo ao Painel de Controle!
          </h1>
          <p className="lead text-secondary" style={{ fontFamily: 'sans-serif' }}>
            O sistema de autenticacao, controle de sessao e seguranca de rotas esta operacional.
          </p>
          <hr className="my-4" />

          <div className="p-4 text-start" style={{ backgroundColor: '#e0f2fe', borderRadius: '12px', color: '#0369a1' }}>
            <h5 className="fw-bold mb-2" style={{ fontFamily: 'sans-serif' }}>
              Espaco reservado para a equipe
            </h5>
            <p className="mb-0" style={{ fontFamily: 'sans-serif', fontSize: '15px', lineHeight: '1.6' }}>
              Este painel continua protegido contra acessos nao autorizados. O relatorio com JOIN
              foi mantido nesta area administrativa e o restante do site agora roda em React.
            </p>
          </div>
        </div>

        <UsersCrud />
        <RelatorioAdocoes />
      </div>
    </div>
  );
}
