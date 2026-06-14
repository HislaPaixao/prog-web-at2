import { Link, NavLink, Outlet } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/pets', label: 'Quero adotar' },
  { to: '/voluntariado', label: 'Seja voluntario' },
  { to: '/pets/novo', label: 'Adicionar pet' },
  { to: '/faq', label: 'FAQ' },
];

function getNavClass({ isActive }) {
  return `site-nav-link${isActive ? ' active' : ''}`;
}

export default function PublicLayout({ isLoggedIn }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container py-3">
          <div className="site-header-row">
            <Link to="/" className="site-brand">
              <img src="/img/logo1.png" alt="Logo Cafofo" className="site-brand-logo" />
              <div>
                <strong className="site-brand-title">Cafofo dos Peludos</strong>
                <span className="site-brand-subtitle">Adocao responsavel e apoio a voluntarios</span>
              </div>
            </Link>

            <nav className="site-nav" aria-label="Principal">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={getNavClass}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="site-actions">
              {isLoggedIn ? (
                <Link to="/dashboard" className="btn btn-dark rounded-pill px-4">
                  Painel admin
                </Link>
              ) : (
                <Link to="/login" className="btn btn-warning rounded-pill px-4">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container py-4">
          <div className="site-footer-row">
            <div>
              <strong>Cafofo dos Peludos</strong>
              <p className="mb-0 text-secondary">
                Projeto em React para adocao, voluntariado e painel administrativo.
              </p>
            </div>
            <a className="text-decoration-none" href="mailto:CafofoDosPeludos@gmail.com">
              CafofoDosPeludos@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
