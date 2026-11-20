import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__logo">SkillsHub</div>
        <div className="header__links">
          <Link to="/" className="header__link">Inicio</Link>
          <Link to="/about" className="header__link">Sobre el autor</Link>
          <Link to="/signin" className="header__link">Iniciar Sesion</Link>
          <Link to="/signup" className="header__link">Registrate</Link>

        </div>

      </nav>
    </header>
  );
};

export default Header;
