import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__logo">SkillsHub</Link>
        <ul className="header__links">
          <li className="header__link">
            <Link to="/" className="header__link">Inicio</Link>
          </li>
          <li className="header__link">
            <Link to="/about" className="header__link">Sobre el autor</Link>
          </li>
          <li className="header__link">
            <Link to="/explorar" className="header__link">Explorar talento</Link>
          </li>
        </ul>

      </nav>
    </header>
  );
};

export default Header;
