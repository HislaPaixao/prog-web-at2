import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdoptionReasonPage() {
  const [motivo, setMotivo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/adocao/finalizada');
  };

  return (
    <section className="container py-5">
      <div className="form-wrapper">
        <span className="eyebrow">Etapa 3</span>
        <h1>Explique por que voce deseja adotar um animal</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            className="form-control form-textarea"
            rows="7"
            value={motivo}
            onChange={(event) => setMotivo(event.target.value)}
            placeholder="Escreva aqui sua resposta..."
            required
          />
          <button type="submit" className="btn btn-warning rounded-pill px-4 mt-4">
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}
