import { Link } from 'react-router-dom';
import { petsCatalog } from '../data/publicData';

export default function PetsPage() {
  return (
    <section className="container py-5">
      <div className="section-heading">
        <span className="eyebrow">Campanha de adocao</span>
        <h1>Pets disponiveis</h1>
        <p className="text-secondary mb-0">
          Escolha um pet, conheca o perfil dele e siga para o formulario de interesse.
        </p>
      </div>

      <div className="row g-4 mt-1">
        {petsCatalog.map((pet) => (
          <div key={pet.id} className="col-sm-6 col-lg-4 col-xl-3">
            <article className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img src={pet.imagem} alt={pet.nome} className="pet-card-image" />
              <div className="card-body p-4 d-flex flex-column">
                <div className="pet-card-meta mb-2">
                  <span className="badge text-bg-light">{pet.especie}</span>
                  <span className="text-secondary small">{pet.idade}</span>
                </div>
                <h2 className="h4">{pet.nome}</h2>
                <p className="text-secondary mb-2">{pet.cidade}</p>
                <p className="text-secondary flex-grow-1">{pet.descricao}</p>
                <Link to="/declaracao" className="btn btn-warning rounded-pill">
                  Quero adotar
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
