import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ADOCOES_API = 'http://localhost:3001/adocoes';
const PETS_API = 'http://localhost:3001/pets';

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
  const [petSelecionado, setPetSelecionado] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const petId = searchParams.get('petId');

  useEffect(() => {
    if (petId) {
      carregarPet(petId);
    }
  }, [petId]);

  const carregarPet = async (id) => {
    try {
      const response = await fetch(`${PETS_API}/${id}`);
      if (response.ok) {
        const pet = await response.json();
        setPetSelecionado(pet);
      }
    } catch (error) {
      console.error('Erro ao carregar pet:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!petSelecionado) {
      alert('Nenhum pet selecionado para adocao.');
      return;
    }

    const adocaoData = {
      petId: petSelecionado.id,
      nomePet: petSelecionado.nome,
      especiePet: petSelecionado.tipo,
      idadePet: petSelecionado.idade,
      adotante: `${formData.nome} ${formData.sobrenome}`,
      cidade: `${formData.cidade} - ${formData.estado}`,
      endereco: `${formData.endereco}, ${formData.complemento || ''} - CEP: ${formData.cep}`,
      status: 'Pendente',
      dataAdocao: new Date().toISOString()
    };

    try {
      const response = await fetch(ADOCOES_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adocaoData)
      });

      if (!response.ok) throw new Error('Erro ao registrar adocao');

      navigate(`/adocao/motivo?petId=${petSelecionado.id}&adotante=${encodeURIComponent(adocaoData.adotante)}`);
    } catch (error) {
      alert('Erro ao processar adocao. Tente novamente.');
      console.error('Erro:', error);
    }
  };

  return (
    <section className="container py-5">
      <div className="form-wrapper">
        <span className="eyebrow">Etapa 2</span>
        <h1>Queremos saber mais sobre voce</h1>

        {petSelecionado && (
          <div className="alert alert-info rounded-4 mt-3">
            Voce esta se candidatando para adotar: <strong>{petSelecionado.nome}</strong> ({petSelecionado.tipo})
          </div>
        )}

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