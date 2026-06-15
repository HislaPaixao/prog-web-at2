import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001/pets';

const initialState = {
  nome: '',
  tipo: 'Cachorro',
  idade: '',
  descricao: '',
  foto: '',
  status: 'disponivel'
};

export default function AddPetPage() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    const arquivo = event.target.files?.[0];
    if (arquivo) {
      const imageUrl = URL.createObjectURL(arquivo);
      setFormData((current) => ({ ...current, foto: imageUrl }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErro('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Erro ao cadastrar');

      setSucesso(true);
      setFormData(initialState);
      
      setTimeout(() => {
        navigate('/pets');
      }, 2000);
    } catch (error) {
      setErro('Erro ao cadastrar pet. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-5">
      <div className="form-wrapper">
        <span className="eyebrow">Cadastro</span>
        <h1>Adicionar um pet para adoção</h1>
        <p className="text-secondary">
          Preencha os dados do pet para disponibilizá-lo para adoção.
        </p>

        {sucesso && (
          <div className="alert alert-success rounded-4 mt-3">
             Pet cadastrado com sucesso! Redirecionando...
          </div>
        )}

        {erro && (
          <div className="alert alert-danger rounded-4 mt-3">
             {erro}
          </div>
        )}

        <form className="row g-3 mt-2" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Nome do pet *</label>
            <input
              className="form-control"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Ex: Fred"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Tipo de animal *</label>
            <select 
              className="form-select" 
              name="tipo" 
              value={formData.tipo} 
              onChange={handleChange}
              required
            >
              <option>Cachorro</option>
              <option>Gato</option>
              <option>Outro</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Idade *</label>
            <input
              className="form-control"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              required
              placeholder="Ex: 6 meses"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select 
              className="form-select" 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
            >
              <option value="disponivel">Disponível</option>
              <option value="adotado">Adotado</option>
              <option value="indisponivel">Indisponível</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Foto</label>
            <input 
              type="file" 
              className="form-control" 
              onChange={handleFileChange}
              accept="image/*"
            />
            {formData.foto && (
              <div className="mt-2">
                <img 
                  src={formData.foto} 
                  alt="Preview" 
                  style={{ maxWidth: '150px', borderRadius: '8px' }} 
                />
              </div>
            )}
          </div>

          <div className="col-12">
            <label className="form-label">Descrição *</label>
            <textarea
              className="form-control form-textarea"
              name="descricao"
              rows="5"
              value={formData.descricao}
              onChange={handleChange}
              required
              placeholder="Descreva a personalidade e características do pet..."
            />
          </div>

          <div className="col-12 d-flex gap-2">
            <button 
              type="submit" 
              className="btn btn-warning rounded-pill px-4"
              disabled={loading}
            >
              {loading ? 'Salvando...' : '🐾 Adicionar Pet'}
            </button>
            <button 
              type="button" 
              className="btn btn-outline-secondary rounded-pill px-4"
              onClick={() => navigate('/pets')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}