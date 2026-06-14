import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState = {
  nome: '',
  telefone: '',
  email: '',
  idade: '18',
  endereco: '',
  periodo: 'Manha',
  genero: 'Homem',
};

export default function VolunteerFormPage() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/voluntariado/finalizado');
  };

  return (
    <section className="container py-5">
      <div className="form-wrapper">
        <span className="eyebrow">Voluntariado</span>
        <h1>Seja nosso voluntario</h1>

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
            <label className="form-label">Telefone</label>
            <input
              className="form-control"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Idade</label>
            <select className="form-select" name="idade" value={formData.idade} onChange={handleChange}>
              <option>18</option>
              <option>19</option>
              <option>20</option>
              <option>21</option>
              <option>22</option>
              <option>23</option>
              <option>24</option>
              <option>25</option>
              <option>26</option>
              <option>27</option>
              <option>28</option>
              <option>29</option>
              <option>30</option>
              <option>Mais de 30</option>
              <option>Mais de 45</option>
              <option>Mais de 60</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Endereco</label>
            <input
              className="form-control"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label d-block">Tempo disponivel</label>
            <div className="d-flex flex-wrap gap-3 mt-2">
              {['Manha', 'Tarde', 'Noite'].map((periodo) => (
                <label key={periodo} className="radio-chip">
                  <input
                    type="radio"
                    name="periodo"
                    value={periodo}
                    checked={formData.periodo === periodo}
                    onChange={handleChange}
                  />
                  <span>{periodo}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Genero</label>
            <select className="form-select" name="genero" value={formData.genero} onChange={handleChange}>
              <option>Homem</option>
              <option>Mulher</option>
              <option>Outro</option>
            </select>
          </div>
          <div className="col-12 pt-2">
            <button type="submit" className="btn btn-warning rounded-pill px-4">
              Enviar formulario
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
