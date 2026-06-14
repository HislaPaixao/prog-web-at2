import { Link } from 'react-router-dom';

export default function VolunteerIntroPage() {
  return (
    <section className="container py-5">
      <div className="section-heading">
        <span className="eyebrow">Parceria</span>
        <h1>Quer ser nosso parceiro?</h1>
      </div>

      <div className="content-card">
        <p>
          O objetivo do Cafofo dos Peludos e conectar pessoas dispostas a ajudar com animais que
          precisam de cuidado, divulgacao e acompanhamento.
        </p>
        <p>
          O voluntariado ajuda a ampliar a rede de apoio, melhora o atendimento aos animais e
          fortalece as campanhas de adocao responsavel.
        </p>
        <Link to="/voluntariado/formulario" className="btn btn-warning rounded-pill px-4 mt-3">
          Vem ser nosso voluntario
        </Link>
      </div>
    </section>
  );
}
