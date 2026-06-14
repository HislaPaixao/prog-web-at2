import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { heroImages, homeHighlights, reasonsToAdopt } from '../data/publicData';

export default function HomePage() {
  const [slideAtual, setSlideAtual] = useState(0);

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setSlideAtual((valorAtual) => (valorAtual + 1) % heroImages.length);
    }, 3500);

    return () => window.clearInterval(intervalo);
  }, []);

  return (
    <div>
      <section className="hero-section">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <span className="eyebrow">Projeto React baseado no site original</span>
              <h1 className="display-5 fw-bold mb-3">Conheca o Cafofo dos Peludos</h1>
              <p className="lead text-secondary">
                A ONG resgata, cuida e conecta animais a novas familias com foco em adocao
                responsavel, acolhimento e voluntariado.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/pets" className="btn btn-warning btn-lg rounded-pill px-4">
                  Quero adotar
                </Link>
                <Link to="/voluntariado" className="btn btn-outline-dark btn-lg rounded-pill px-4">
                  Quero ser voluntario
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-frame">
                <img src={heroImages[slideAtual]} alt="Banner Cafofo dos Peludos" className="hero-image" />
                <div className="hero-indicators">
                  {heroImages.map((imagem, indice) => (
                    <button
                      key={imagem}
                      type="button"
                      className={`hero-indicator${indice === slideAtual ? ' active' : ''}`}
                      onClick={() => setSlideAtual(indice)}
                      aria-label={`Mostrar banner ${indice + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="section-heading">
          <h2>Como o projeto funciona</h2>
          <p className="text-secondary mb-0">
            O fluxo continua o mesmo do HTML original, agora dentro de uma unica aplicacao React.
          </p>
        </div>

        <div className="row g-4 mt-1">
          {homeHighlights.map((item) => (
            <div key={item.titulo} className="col-lg-4">
              <article className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <img src={item.imagem} alt={item.titulo} className="card-thumb" />
                <div className="card-body p-4">
                  <h3 className="h4">{item.titulo}</h3>
                  <p className="text-secondary">{item.texto}</p>
                  <Link to={item.link} className="btn btn-outline-warning rounded-pill">
                    {item.linkTexto}
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-5">
        <div className="info-panel">
          <div>
            <h2>Por que adotar?</h2>
            <ol className="reasons-list">
              {reasonsToAdopt.map((motivo) => (
                <li key={motivo}>{motivo}</li>
              ))}
            </ol>
          </div>

          <div className="ratio ratio-16x9 video-card">
            <iframe
              src="https://www.youtube.com/embed/4FlvZPHrFlc?si=iDHIaN7p9NS2ScVm"
              title="Video sobre adocao"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
}
