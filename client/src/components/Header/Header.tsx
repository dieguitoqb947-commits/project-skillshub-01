import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/about">Sobre el autor</Link>
      </nav>
    </header>
  );
};

export default Header;
