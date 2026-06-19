import { Link, useSearchParams } from 'react-router-dom';

export default function AdoptionDeclarationPage() {
  const [searchParams] = useSearchParams();
  const petId = searchParams.get('petId');

  return (
    <section className="container py-5">
      <div className="form-wrapper text-center">
        <span className="eyebrow">Etapa 1</span>
        <h1>Declaracao de Adocao</h1>
        <p className="text-secondary mt-3">
          Ao prosseguir, voce declara que tem condicoes de cuidar do animal e oferecer um lar seguro.
        </p>
        
        <div className="mt-4">
          <Link 
            to={`/adocao/dados?petId=${petId}`}  // Passa o petId pra frente
            className="btn btn-warning rounded-pill px-5"
          >
            Aceito e quero continuar
          </Link>
        </div>
      </div>
    </section>
  );
}