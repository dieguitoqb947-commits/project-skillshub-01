import { useEffect, useRef } from 'react';
import type { TalentProfile } from '../../types';
import './talentDetailModal.css';

type TalentDetailModalProps = {
  profile: TalentProfile | null;
  onClose: () => void;
};

const TalentDetailModal = ({ profile, onClose }: TalentDetailModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!profile) {
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
  }, [profile, onClose]);

  if (!profile) {
    return null;
  }

  return (
    <div
      className="talent-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="talent-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="talent-modal-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="talent-modal__close"
          aria-label="Cerrar perfil"
          onClick={onClose}
        >
          ×
        </button>
        <p className="talent-modal__category">{profile.category}</p>
        <h2 id="talent-modal-title" className="talent-modal__title">
          {profile.roleTitle}
        </h2>
        <p className="talent-modal__meta">
          {profile.fullName} · {profile.location} · {profile.experienceYears} años de
          experiencia
        </p>
        <p className="talent-modal__summary">{profile.summary}</p>
        <p className="talent-modal__detail">
          Disponibilidad: {profile.availability}, desde {profile.availableFrom}.
        </p>
        <p className="talent-modal__detail">
          Compensación base:{' '}
          <strong>
            {new Intl.NumberFormat('es', {
              style: 'currency',
              currency: profile.currency,
              currencyDisplay: 'code',
              maximumFractionDigits: 0,
            }).format(profile.baseCompensation)}
          </strong>
        </p>
        <ul className="talent-modal__skills">
          {profile.keySkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        {profile.portfolioUrl ? (
          <a
            className="talent-modal__link"
            href={profile.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver portafolio
          </a>
        ) : (
          <p className="talent-modal__detail">Este perfil no incluye portafolio.</p>
        )}
      </div>
    </div>
  );
};

export default TalentDetailModal;
