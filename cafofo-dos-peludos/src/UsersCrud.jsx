import { useEffect, useState } from 'react';

const initialForm = {
  id: null,
  nome: '',
  email: '',
  telefone: '',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function carregarUsuarios() {
  try {
    const dados = localStorage.getItem('usuarios');
    if (!dados) return [];
    const lista = JSON.parse(dados);
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

export default function UsersCrud() {
  const [users, setUsers] = useState(() => carregarUsuarios());
  const [formData, setFormData] = useState(initialForm);
  const [editando, setEditando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(users));
  }, [users]);

  function validarFormulario() {
    if (!formData.nome.trim()) {
      return 'O nome do usuário é obrigatório.';
    }

    if (formData.nome.trim().length < 3) {
      return 'O nome deve ter pelo menos 3 caracteres.';
    }

    if (!formData.email.trim()) {
      return 'O e-mail é obrigatório.';
    }

    if (!emailRegex.test(formData.email.trim())) {
      return 'Informe um e-mail válido.';
    }

    return '';
  }

  function resetarFormulario() {
    setFormData(initialForm);
    setEditando(false);
    setErro('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const mensagem = validarFormulario();

    if (mensagem) {
      setErro(mensagem);
      return;
    }

    if (editando) {
      setUsers((current) =>
        current.map((usuario) =>
          usuario.id === formData.id ? { ...usuario, ...formData } : usuario,
        ),
      );
      resetarFormulario();
      return;
    }

    const novoUsuario = {
      ...formData,
      id: Date.now(),
    };

    setUsers((current) => [novoUsuario, ...current]);
    resetarFormulario();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleEditar(usuario) {
    setFormData(usuario);
    setEditando(true);
    setErro('');
  }

  function handleExcluir(id) {
    if (!window.confirm('Tem certeza de que deseja excluir este usuário?')) {
      return;
    }

    setUsers((current) => current.filter((usuario) => usuario.id !== id));
    if (editando && formData.id === id) {
      resetarFormulario();
    }
  }

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
          <h2 style={{ margin: '0 0 8px', color: '#f59e0b' }}>CRUD de Usuários</h2>
          <p style={{ margin: 0, color: '#4b5563', lineHeight: '1.6' }}>
            Cadastre, liste, edite e exclua usuários diretamente no painel administrativo.
            Os dados são salvos no <strong>localStorage</strong> para manter a lista entre cargas.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '24px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'grid', gap: '16px' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="nome" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Informe o nome"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="usuario@exemplo.com"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="telefone" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                  Telefone
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="(xx) xxxxx-xxxx"
                />
              </div>

              {erro && (
                <div className="alert alert-warning" role="alert" style={{ marginBottom: '16px' }}>
                  {erro}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button type="submit" className="btn btn-primary">
                  {editando ? 'Atualizar usuário' : 'Cadastrar usuário'}
                </button>
                {editando && (
                  <button type="button" className="btn btn-secondary" onClick={resetarFormulario}>
                    Cancelar edição
                  </button>
                )}
              </div>
            </form>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '12px',
              }}
            >
              <div style={{ backgroundColor: '#fff7ed', borderRadius: '12px', padding: '16px' }}>
                <strong style={{ display: 'block', color: '#9a3412' }}>Total de usuários</strong>
                <span style={{ fontSize: '28px', color: '#c2410c' }}>{users.length}</span>
              </div>
              <div style={{ backgroundColor: '#ecfeff', borderRadius: '12px', padding: '16px' }}>
                <strong style={{ display: 'block', color: '#155e75' }}>Status</strong>
                <span style={{ fontSize: '18px', color: '#0f766e' }}>
                  {users.length === 0 ? 'Nenhum usuário cadastrado' : 'Usuários prontos' }
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Nome</th>
                <th style={{ padding: '12px' }}>E-mail</th>
                <th style={{ padding: '12px' }}>Telefone</th>
                <th style={{ padding: '12px', width: '180px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>
                    Nenhum usuário encontrado. Preencha o formulário para criar o primeiro cadastro.
                  </td>
                </tr>
              ) : (
                users.map((usuario) => (
                  <tr key={usuario.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}>{usuario.nome}</td>
                    <td style={{ padding: '12px' }}>{usuario.email}</td>
                    <td style={{ padding: '12px' }}>{usuario.telefone}</td>
                    <td style={{ padding: '12px' }}>
                      <button
                        type="button"
                        onClick={() => handleEditar(usuario)}
                        className="btn btn-sm btn-outline-primary"
                        style={{ marginRight: '8px' }}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleExcluir(usuario.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
