import React, { useEffect } from 'react';
import RelatorioAdocoes from './RelatorioAdocoes';

export default function Dashboard() {

  useEffect(() => {
    const logado = localStorage.getItem('usuarioLogado');
    if (logado !== 'true') {
      alert("Acesso negado! Por favor, faça login.");
      window.location.href = "/"; 
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('usuarioLogado');
    alert("Sessão encerrada!");
    window.location.href = "/"; 
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', width: '100%', margin: 0, padding: 0, boxSizing: 'border-box', overflowX: 'hidden' }}>
      
    
      <nav style={{
        backgroundColor: '#212529', 
        padding: '15px 40px', 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="img/logo1.png" 
            alt="Logo Cafofo" 
            style={{ maxHeight: '40px', marginRight: '12px', backgroundColor: 'white', borderRadius: '6px', padding: '3px' }} 
          />
          <span style={{ color: 'orange', fontSize: '24px', fontFamily: "'Baloo', cursive", fontWeight: 'bold' }}>
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
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}
          >
            Sair / Logout
          </button>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '50px', paddingLeft: '20px', paddingRight: '20px' }}>
        <div className="card p-5 border-0 shadow-sm text-center" style={{ borderRadius: '16px', backgroundColor: '#ffffff' }}>
          <h1 className="display-4 mb-3" style={{ color: 'orange', fontFamily: "'Baloo', cursive" }}>
            Bem-vindo ao Painel de Controle! 🐾
          </h1>
          <p className="lead text-secondary" style={{ fontFamily: 'sans-serif' }}>
            O sistema de autenticação, controle de sessão e segurança de rotas está 100% operacional.
          </p>
          <hr className="my-4" />
          
          <div className="p-4 text-left" style={{ backgroundColor: '#e0f2fe', borderRadius: '12px', color: '#0369a1' }}>
            <h5 className="font-weight-bold mb-2" style={{ fontFamily: 'sans-serif' }}>📢 Espaço Reservado para a Equipe:</h5>
            <p className="mb-0" style={{ fontFamily: 'sans-serif', fontSize: '15px', lineHeight: '1.6' }}>
              Olá time! Este painel já está protegido contra acessos não autorizados. Vocês podem acoplar os componentes dos <strong>3 CRUDs</strong> e do <strong>Relatório com JOIN</strong> diretamente nesta área ou criar sub-rotas a partir daqui.
            </p>
          </div>
        </div>

        <RelatorioAdocoes />
      </div>

    </div>
  );
}
