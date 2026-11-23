import './about.css';

const About = () => {
  return (
    <article className="about">
      <header className="about__intro">
        <h1 className="about__title" id="about-title">
          Sobre el autor
        </h1>
        <p className="about__lead">
          Skills Hub conecta empresas con profesionales y muestra su compensación en la
          moneda de cada país.
        </p>
      </header>

      <section className="about__card" aria-labelledby="about-author">
        <h2 className="about__heading" id="about-author">
          Diego
        </h2>
        <p>Desarrollador web full stack en formación.</p>
        <p>Este proyecto es parte del curso de desarrollo web de Tripleten.</p>
      </section>

      <section className="about__card" aria-labelledby="about-project">
        <h2 className="about__heading" id="about-project">
          Sobre el proyecto
        </h2>
        <p>
          La aplicación deja explorar perfiles por habilidad, categoría y ubicación. La
          compensación base se muestra en la moneda local del profesional y el
          convertidor, alimentado por la Frankfurter API, la traduce a dólares.
        </p>
        <p>
          En etapas posteriores incluye autenticación y gestión de ofertas competitivas.
        </p>
      </section>
    </article>
  );
};

export default About;
