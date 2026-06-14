import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdoptionDeclarationPage() {
  const [aceito, setAceito] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!aceito) {
      alert('Voce precisa confirmar a declaracao para continuar.');
      return;
    }

    navigate('/adocao/dados');
  };

  return (
    <section className="container py-5">
      <div className="form-wrapper">
        <span className="eyebrow">Etapa 1</span>
        <h1>Declaracao de interesse</h1>
        <p className="text-secondary">
          Antes do formulario, confirme que entendeu as condicoes basicas da adocao.
        </p>

        <div className="alert alert-light border rounded-4">
          <p>
            Para garantir uma adocao consciente e responsavel, precisamos conhecer melhor suas
            intencoes, sua rotina e as condicoes que voce tem para receber um animal.
          </p>
          <p className="mb-0">
            A equipe pode solicitar informacoes adicionais, fazer contato e orientar o restante do
            processo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="check-card">
            <input
              id="condicoes"
              type="checkbox"
              checked={aceito}
              onChange={(event) => setAceito(event.target.checked)}
            />
            <label htmlFor="condicoes">
              Estou ciente de que a adocao pode exigir visita, validacao da equipe e assinatura de
              compromisso.
            </label>
          </div>

          <button type="submit" className="btn btn-warning rounded-pill px-4 mt-4">
            Confirmar e continuar
          </button>
        </form>
      </div>
    </section>
  );
}
