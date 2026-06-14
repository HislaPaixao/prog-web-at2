import { Link } from 'react-router-dom';

export default function VolunteerFinishPage() {
  return (
    <section className="container py-5">
      <div className="success-card">
        <span className="eyebrow">Voluntariado</span>
        <h1>Formulario enviado com sucesso</h1>
        <p className="text-secondary">
          Obrigado por se disponibilizar para ajudar. Em breve a equipe entra em contato.
        </p>
        <div className="d-flex flex-wrap gap-3 justify-content-center mt-3">
          <Link to="/voluntariado" className="btn btn-warning rounded-pill px-4">
            Voltar para voluntariado
          </Link>
          <Link to="/" className="btn btn-outline-dark rounded-pill px-4">
            Ir para o inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
