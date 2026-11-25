import { useState, useEffect, useRef, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthModal.css';
import { useCurrentUser } from '../../context/CurrentUserContext';
import {  AuthApiError } from '../../utils/api';




type AuthModalProps = {
  isOpen: boolean;
  mode: 'signin' | 'signup';
  onClose: () => void;
  onSwitchMode: () => void;
  onRegistered: () => void;
};

export const AuthModal = ({ isOpen, mode, onClose, onSwitchMode, onRegistered }: AuthModalProps) => {


    const { signIn, signUp } = useCurrentUser();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSwitch = () => {
       setName('');
       setEmail('');
       setPassword('');
       setError(null);
       onSwitchMode();
    }

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        if(!email.trim() || !password.trim()) {
            setError('Por favor, ingrese un correo electrónico y contraseña');
            return;
        }
        

        if(mode === 'signup' && password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres');
            return;
        } else if(mode === 'signup' && name.trim().length === 0) {
            setError('Por favor, ingrese un nombre');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.trim())) {
            setError('Escribe un correo electrónico válido');
            return;
          }

        setSubmitting(true);

        try {
            if(mode === 'signin') {
                await signIn({ email, password });
            }else{
                await signUp({ name, email, password });
            }
            setName('');
            setEmail('');
            setPassword('');
            onClose();
            if(mode === 'signup') {
                onRegistered();
            }
            navigate('/explorar');
            
        }catch(error){
            if(error instanceof AuthApiError){
                setError(error.message);
            }else{
                setError('No se pudo completar la solicitud.');
            }
        }finally{
            setSubmitting(false);
        }


    }



  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const title = mode === 'signin' ? 'Iniciar sesión' : 'Crear cuenta';

  return (
    <div
      className="auth-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="auth-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="auth-modal__close"
          aria-label="Cerrar"
          onClick={onClose}
        >
          ×
        </button>
        <h2 id="auth-modal-title" className="auth-modal__title">
          {title}
        </h2>
        <form onSubmit={handleSubmit} noValidate className="auth-modal__form">

             {mode === "signup" ? (
                <label className="auth-modal__field">
                    Nombre
                    <input
                      className="auth-modal__input"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Empresa SAS"
                      required
                    />
                </label>
             ) : null}

             <label className="auth-modal__field">
                Correo electrónico
                <input
                  className="auth-modal__input"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="correo@empresa.com"
                  required
                />
             </label>

             <label className="auth-modal__field">
                Contraseña
                <input
                  className="auth-modal__input"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={8}
                  placeholder="Contraseña"
                />
             </label>
             {error && error.length > 0 ? (
               <p className="auth-modal__error" role="alert">{error}</p>
             ) : null}
            <button className="auth-modal__submit" type="submit" disabled={submitting}>
              {submitting ? "Cargando..." : mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}
            </button>
             <button className="auth-modal__switch" type="button" onClick={handleSwitch}>
                {mode === "signin" ? "Crear cuenta" : "Ya tengo cuenta"}
             </button>
        </form>
        </div>
    </div>
  );
};
