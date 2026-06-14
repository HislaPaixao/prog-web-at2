import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState = {
  nome: '',
  sobrenome: '',
  endereco: '',
  complemento: '',
  cidade: '',
  estado: '',
  cep: '',
};

export default function AdoptionFormPage() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/adocao/motivo');
  };

  return (
    <section className="container py-5">
      <div className="form-wrapper">
        <span className="eyebrow">Etapa 2</span>
        <h1>Queremos saber mais sobre voce</h1>
        <form className="row g-3 mt-2" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Nome</label>
            <input
              className="form-control"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Sobrenome</label>
            <input
              className="form-control"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Endereco</label>
            <input
              className="form-control"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              placeholder="Rua, numero e bairro"
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Complemento</label>
            <input
              className="form-control"
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
              placeholder="Apartamento, casa ou referencia"
            />
          </div>
          <div className="col-md-5">
            <label className="form-label">Cidade</label>
            <input
              className="form-control"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Estado</label>
            <input
              className="form-control"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">CEP</label>
            <input
              className="form-control"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 pt-2">
            <button type="submit" className="btn btn-warning rounded-pill px-4">
              Proxima etapa
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
