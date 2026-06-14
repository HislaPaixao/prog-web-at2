import { faqItems } from '../data/publicData';

export default function FaqPage() {
  return (
    <section className="container py-5">
      <div className="section-heading">
        <span className="eyebrow">FAQ</span>
        <h1>Como ajudar</h1>
        <p className="text-secondary mb-0">
          Perguntas frequentes sobre adocao, voluntariado e apoio ao projeto.
        </p>
      </div>

      <div className="faq-list mt-4">
        {faqItems.map((item) => (
          <details key={item.pergunta} className="faq-item">
            <summary>{item.pergunta}</summary>
            <p>{item.resposta}</p>
          </details>
        ))}
      </div>

      <div className="content-card mt-4">
        <strong>Contato direto</strong>
        <p className="mb-0">
          Se preferir, fale com a equipe pelo e-mail{' '}
          <a className="text-decoration-none" href="mailto:CafofoDosPeludos@gmail.com">
            CafofoDosPeludos@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
