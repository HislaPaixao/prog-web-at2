import { useState } from 'react';

const initialState = {
  nome: '',
  tipo: 'Cachorro',
  idade: '',
  descricao: '',
  foto: '',
};

export default function AddPetPage() {
  const [formData, setFormData] = useState(initialState);
  const [enviado, setEnviado] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    const arquivo = event.target.files?.[0];
    setFormData((current) => ({ ...current, foto: arquivo ? arquivo.name : '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEnviado(true);
    setFormData(initialState);
  };

  return (
    <section className="container py-5">
      <div className="form-wrapper">
        <span className="eyebrow">Cadastro</span>
        <h1>Adicionar um pet para adocao</h1>
        <p className="text-secondary">
          Esta tela foi convertida para React. O envio continua simulado, sem backend.
        </p>

        {enviado && (
          <div className="alert alert-success rounded-4 mt-3">
            Pet enviado com sucesso para avaliacao da equipe.
          </div>
        )}

        <form className="row g-3 mt-2" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Nome do pet</label>
            <input
              className="form-control"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Tipo de animal</label>
            <select className="form-select" name="tipo" value={formData.tipo} onChange={handleChange}>
              <option>Cachorro</option>
              <option>Gato</option>
              <option>Outro</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Idade</label>
            <input
              className="form-control"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Foto</label>
            <input type="file" className="form-control" onChange={handleFileChange} />
          </div>
          <div className="col-12">
            <label className="form-label">Descricao</label>
            <textarea
              className="form-control form-textarea"
              name="descricao"
              rows="5"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-warning rounded-pill px-4">
              Adicionar pet
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
