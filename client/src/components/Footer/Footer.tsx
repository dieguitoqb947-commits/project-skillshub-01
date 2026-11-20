import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            SkillsHub
          </Link>
          <p className="footer__description">
            Subastas de habilidades y micro-mentorías con pujas en tu moneda.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Enlaces del pie de página">
          <Link to="/" className="footer__link">
            Inicio
          </Link>
          <Link to="/about" className="footer__link">
            Sobre el autor
          </Link>
          <a href="/#como-funciona" className="footer__link">
            Cómo funciona
          </a>
        </nav>

        <p className="footer__copy">
          &copy; {new Date().getFullYear()} SkillsHub. Todos los derechos reservados.

        </p>
      </div>
    </footer>
  );
};

export default Footer;

