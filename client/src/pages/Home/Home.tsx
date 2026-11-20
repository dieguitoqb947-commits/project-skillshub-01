import { Link } from 'react-router-dom';

interface HomeCard {
  id: string;
  title: string;
  text: string;
}

const FEATURES: HomeCard[] = [
  {
    id: 'explore',
    title: 'Descubre talento',
    text: 'Busca profesionales por habilidades, categorías y ubicación en un solo lugar.',
  },
  {
    id: 'filter',
    title: 'Filtra por categoría',
    text: 'Encuentra perfiles en Tecnología, Idiomas, Diseño o Negocios según lo que tu equipo necesita.',
  },
  {
    id: 'currency',
    title: 'Compensación en tu moneda',
    text: 'Consulta expectativas base en USD, COP, EUR o MXN con tasas actualizadas de Frankfurter.',
  },
  {
    id: 'detail',
    title: 'Perfiles detallados',
    text: 'Revisa experiencia, disponibilidad, habilidades clave y portafolio antes de contactar al talento.',
  },
];

const AUDIENCES: HomeCard[] = [
  {
    id: 'companies',
    title: 'Empresas y reclutadores',
    text: 'Contrata por competencias reales y prepara ofertas competitivas con datos claros.',
  },
  {
    id: 'freelancers',
    title: 'Freelancers y especialistas',
    text: 'Gana visibilidad internacional y transparencia en cómo se interpreta tu compensación.',
  },
  {
    id: 'global',
    title: 'Equipos globales',
    text: 'Conecta talento en distintos países sin perder contexto local ni de moneda.',
  },
];

const STEPS: HomeCard[] = [
  {
    id: 'search',
    title: 'Busca una habilidad',
    text: 'Escribe el rol o la competencia que necesitas cubrir.',
  },
  {
    id: 'compare',
    title: 'Compara compensación',
    text: 'Cambia la moneda y revisa la expectativa base de cada perfil.',
  },
  {
    id: 'offer',
    title: 'Prepara tu oferta',
    text: 'Abre el detalle del profesional y define una propuesta competitiva.',
  },
];

const Home = () => {
  return (
    <div className="home">
      <section className="home__hero" aria-labelledby="home-title">
        <h1 className="home__title" id="home-title">
          Skills<span className="home__title-accent">Hub</span>
        </h1>
        <p className="home__tagline">
          Descubrimiento de talento y ofertas competitivas en un solo lugar.
        </p>
        <p className="home__lead">
          Conectamos empresas con profesionales calificados en todo el mundo. Explora perfiles,
          compara compensación en varias monedas y toma decisiones con información clara.
        </p>
        <div className="home__buttons">
          <a className="home__btn home__btn-outline" href="#como-funciona">
            Cómo funciona
          </a>
          <Link to="/explorar" className="home__btn home__btn-primary">
            Explorar talento
          </Link>
        </div>
      </section>

      <section className="home__section" aria-labelledby="home-features">
        <h2 className="home__heading" id="home-features">
          Qué puedes hacer
        </h2>
        <ul className="home__cards">
          {FEATURES.map((feature) => (
            <li className="home__card" key={feature.id}>
              <h3 className="home__card-title">{feature.title}</h3>
              <p className="home__card-text">{feature.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="home__section" aria-labelledby="home-audience">
        <h2 className="home__heading" id="home-audience">
          Para quién es
        </h2>
        <ul className="home__cards">
          {AUDIENCES.map((audience) => (
            <li className="home__card home__card_theme_accent" key={audience.id}>
              <h3 className="home__card-title">{audience.title}</h3>
              <p className="home__card-text">{audience.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="home__section" id="como-funciona" aria-labelledby="home-steps">
        <h2 className="home__heading" id="home-steps">
          Cómo funciona
        </h2>
        <ol className="home__steps">
          {STEPS.map((step) => (
            <li className="home__step" key={step.id}>
              <h3 className="home__card-title">{step.title}</h3>
              <p className="home__card-text">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default Home;