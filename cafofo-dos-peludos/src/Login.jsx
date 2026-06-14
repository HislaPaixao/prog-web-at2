import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/login.css';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email.trim() || !senha.trim()) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const emailCorreto = 'admin@cafofo.com';
    const senhaCorreta = '123456';

    if (email === emailCorreto && senha === senhaCorreta) {
      alert('Login realizado com sucesso!');
      onLogin();
      navigate('/dashboard');
    } else {
      alert('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="login-screen">
      <div className="card-login text-center">
        <Link to="/" className="login-back-link">
          Voltar ao site
        </Link>

        <div className="mb-4">
          <img src="/img/logo1.png" alt="Logo Cafofo" className="img-fluid mb-2" style={{ maxHeight: '90px' }} />
          <h2 style={{ color: 'orange', margin: 0 }}>Entrar no Cafofo</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              className="form-control"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Sua senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
            />
          </div>

          <button type="submit" className="btn-orange mt-2">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
