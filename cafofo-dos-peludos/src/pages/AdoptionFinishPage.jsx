import { Link } from 'react-router-dom';

export default function AdoptionFinishPage() {
  return (
    <section className="container py-5">
      <div className="success-card">
        <span className="eyebrow">Adocao concluida</span>
        <h1>Recebemos seu interesse</h1>
        <p className="text-secondary">
          Nossa equipe vai analisar o formulario e entrar em contato com os proximos passos.
        </p>
        <div className="d-flex flex-wrap gap-3 justify-content-center mt-3">
          <Link to="/pets" className="btn btn-warning rounded-pill px-4">
            Ver mais pets
          </Link>
          <Link to="/" className="btn btn-outline-dark rounded-pill px-4">
            Voltar ao inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
