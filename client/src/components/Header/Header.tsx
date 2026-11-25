import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthModal } from '../AuthModal/AuthModal';
import { useCurrentUser } from '../../context/CurrentUserContext';
import SuccessRegister from '../SuccessRegister/SuccessRegister';

const Header = () => {
      const { currentUser, isLoading, signOut } = useCurrentUser();
      const navigate = useNavigate();
      const  [ isAuthModalOpen, setIsAuthModalOpen ] = useState(false);
      const  [ authMode, setAuthMode ] = useState<'signin' | 'signup'>('signin');
      const  [ isSuccessRegisterOpen, setIsSuccessRegisterOpen ] = useState(false);





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
          { currentUser ? (
            <li className="header__link">
              <Link to="/ofertas" className="header__link">Mis ofertas</Link>
            </li>
          ) : null}
        </ul>
        {isLoading ? null : currentUser ? (
          <div className="header__session">
            <span className="header__user">Bienvenido, {currentUser.name}</span>
            <button
              className="header__cta"
              type="button"
              onClick={() => {
                signOut();
                setIsSuccessRegisterOpen(false);
                navigate('/');
              }}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <button
            className="header__cta"
            type="button"
            onClick={() => {
              setAuthMode('signin');
              setIsAuthModalOpen(true);
            }}
          >
            Entrar
          </button>
        )}

      </nav>
      <AuthModal isOpen={isAuthModalOpen} mode={authMode} onClose={() => 
        setIsAuthModalOpen(false)
      } onSwitchMode={() => 
        setAuthMode((mode) => (mode === 'signin' ? 'signup' : 'signin'))
      } onRegistered={() => setIsSuccessRegisterOpen(true)}
      />
    <SuccessRegister isOpen={isSuccessRegisterOpen} isSuccess={true} onClose={() => setIsSuccessRegisterOpen(false)}  />
    </header>
  );
};

export default Header;
