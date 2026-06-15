import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:3001/pets';

export default function EditPetPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    carregarPet();
  }, [id]);

  const carregarPet = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Erro ao carregar');
      const pet = await response.json();
      setFormData(pet);
      setPreviewUrl(pet.foto || '');
    } catch (error) {
      setErro('Erro ao carregar dados do pet.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    const arquivo = event.target.files?.[0];
    if (arquivo) {
      // Cria preview local
      const imageUrl = URL.createObjectURL(arquivo);
      setPreviewUrl(imageUrl);
      
      // Salva o caminho relativo (simula upload)
      const caminhoRelativo = `/img/${arquivo.name}`;
      setFormData((current) => ({ ...current, foto: caminhoRelativo }));
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    setFormData((current) => ({ ...current, foto: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setErro('');

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Erro ao atualizar');
      
      alert('Pet atualizado com sucesso!');
      navigate('/pets');
    } catch (error) {
      setErro('Erro ao atualizar pet. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (erro && !formData) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{erro}</div>
        <button className="btn btn-secondary" onClick={() => navigate('/pets')}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <section className="container py-5">
      <div className="form-wrapper">
        <span className="eyebrow">Edicao</span>
        <h1>Editar {formData?.nome}</h1>

        {erro && (
          <div className="alert alert-danger rounded-4 mt-3">{erro}</div>
        )}

        <form className="row g-3 mt-2" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Nome *</label>
            <input
              className="form-control"
              name="nome"
              value={formData?.nome || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Tipo *</label>
            <select 
              className="form-select" 
              name="tipo" 
              value={formData?.tipo || ''} 
              onChange={handleChange}
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
              value={formData?.idade || ''} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select 
              className="form-select" 
              name="status" 
              value={formData?.status || ''} 
              onChange={handleChange}
            >
              <option value="disponivel">Disponivel</option>
              <option value="adotado">Adotado</option>
              <option value="indisponivel">Indisponivel</option>
            </select>
          </div>

          {/* Campo de upload de imagem */}
          <div className="col-12">
            <label className="form-label">Foto do Pet</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              accept="image/*"
            />
            <small className="text-muted">
              Formatos aceitos: JPG, PNG, GIF. Imagens na pasta /public/img/
            </small>
          </div>

          {/* Preview da imagem */}
          {previewUrl && (
            <div className="col-12">
              <div className="position-relative d-inline-block">
                <img
                  src={previewUrl}
                  alt="Preview do pet"
                  style={{
                    maxWidth: '250px',
                    maxHeight: '250px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    border: '2px solid #dee2e6'
                  }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="btn btn-danger btn-sm rounded-circle position-absolute"
                  style={{
                    top: '-10px',
                    right: '-10px',
                    width: '30px',
                    height: '30px',
                    padding: '0',
                    lineHeight: '1'
                  }}
                  title="Remover imagem"
                >
                  X
                </button>
              </div>
              <div className="mt-2">
                <small className="text-muted">
                  Caminho: {formData?.foto || 'Nenhuma imagem'}
                </small>
              </div>
            </div>
          )}

          {/* Placeholder quando nao tem imagem */}
          {!previewUrl && (
            <div className="col-12">
              <div
                style={{
                  width: '250px',
                  height: '250px',
                  borderRadius: '12px',
                  border: '2px dashed #dee2e6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8f9fa'
                }}
              >
                <span className="text-muted">Sem foto</span>
              </div>
            </div>
          )}

          <div className="col-12">
            <label className="form-label">Descricao *</label>
            <textarea 
              className="form-control" 
              name="descricao" 
              rows="5" 
              value={formData?.descricao || ''} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-12 d-flex gap-2">
            <button 
              type="submit" 
              className="btn btn-warning rounded-pill px-4" 
              disabled={saving}
            >
              {saving ? 'Salvando...' : 'Salvar'}
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