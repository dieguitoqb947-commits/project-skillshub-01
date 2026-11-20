import { Link } from "react-router-dom";

interface HomeCard {
  id: string;
  title: string;
  text: string;
}

const FEATURES: HomeCard[] = [
  {
    id: 'explore',
    title: 'Explora subastas',
    text: 'Busca por palabra clave entre micro-mentorías, asesorías técnicas y servicios especializados.',
  },
  {
    id: 'filter',
    title: 'Filtra por categoría',
    text: 'Encuentra lo que necesitas en Tecnología, Idiomas, Diseño o Negocios.',
  },
  {
    id: 'currency',
    title: 'Pujas en tu moneda',
    text: 'Consulta la puja base convertida a USD, COP, EUR o MXN con tasas de cambio actualizadas.',
  },
  {
    id: 'detail',
    title: 'Revisa cada detalle',
    text: 'Abre una subasta para conocer al mentor, la descripción de la habilidad y su puja base.',
  },
];

const AUDIENCES: HomeCard[] = [
  {
    id: 'mentors',
    title: 'Mentores y expertos',
    text: 'Comparte lo que sabes en sesiones cortas y deja que el interés de la comunidad defina su valor.',
  },
  {
    id: 'students',
    title: 'Estudiantes',
    text: 'Resuelve dudas puntuales con alguien que ya recorrió el camino, sin pagar un curso completo.',
  },
  {
    id: 'professionals',
    title: 'Profesionales',
    text: 'Consigue asesoría especializada para destrabar un proyecto o prepararte para un nuevo reto.',
  },
];

const STEPS: HomeCard[] = [
  {
    id: 'search',
    title: 'Busca una habilidad',
    text: 'Escribe lo que quieres aprender o elige una categoría.',
  },
  {
    id: 'compare',
    title: 'Compara las pujas',
    text: 'Cambia la moneda y revisa cuánto cuesta cada micro-mentoría.',
  },
  {
    id: 'choose',
    title: 'Elige tu mentoría',
    text: 'Abre el detalle y quédate con la opción que mejor se ajusta a ti.',
  },
];

const Home = () => {
  return (
    <div className="home">
      <section className="home__hero" aria-labelledby="home-title">

        <h1 className="home__title" id="home-title">
          Skills<span className="home__title-accent">Hub</span>
        </h1>
        <p className="home__tagline">La web donde subastas tus habilidades.</p>
        <p className="home__lead">
          Conectamos a mentores, profesionales y estudiantes que quieren ofrecer o conseguir
          micro-mentorías y asesorías mediante un sistema de subastas, con pujas que puedes ver en
          tu moneda.
        </p>
        <div className="home__buttons">
          <a className="home__btn home__btn-outline" href="#como-funciona">
            Cómo funciona
          </a>
          <Link to="/signin" className="home__btn home__btn-primary" >
            Comenzar
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
