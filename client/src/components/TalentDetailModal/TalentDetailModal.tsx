import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import type { TalentProfile } from '../../types';
import { useCurrentUser } from '../../context/CurrentUserContext';
import { useCurrency } from '../../context/CurrencyContext';
import { AuthApiError, createOffer } from '../../utils/api';
import './talentDetailModal.css';

type TalentDetailModalProps = {
  profile: TalentProfile | null;
  onClose: () => void;
};

const TalentDetailModal = ({ profile, onClose }: TalentDetailModalProps) => {
  const { currentUser } = useCurrentUser();
  const { rates, isLoading: ratesLoading } = useCurrency();
  const [amount, setAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const rate = profile ? rates?.[profile.currency] : undefined;
  const floorUsd =
    profile && rate !== undefined && rate > 0
      ? Math.round(
          (profile.currency === 'USD'
            ? profile.baseCompensation
            : profile.baseCompensation / rate) * 100,
        ) / 100
      : null;

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setAmount('');
    setError(null);
    setSent(false);
    setSubmitting(false);
  }, [profile?.id]);

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

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile || !currentUser || floorUsd === null) return;

    const offeredAmountUsd = Number(amount);
    if (!Number.isFinite(offeredAmountUsd) || offeredAmountUsd <= floorUsd) {
      setError('La oferta debe ser mayor a la base en dólares.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await createOffer(currentUser.token, {
        talentId: profile.id,
        talentName: `${profile.fullName} · ${profile.roleTitle}`,
        offeredAmountUsd,
        floorUsd,
      });
      setSent(true);
      setAmount('');
    } catch (err) {
      setError(err instanceof AuthApiError ? err.message : 'No se pudo enviar la oferta.');
    } finally {
      setSubmitting(false);
    }
  };

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
        {ratesLoading ? <p className="talent-modal__detail">Calculando base en dólares...</p> : null}
        {!ratesLoading && floorUsd === null ? (
          <p className="talent-modal__detail">No se pudo calcular la base en dólares.</p>
        ) : null}
        {floorUsd !== null ? (
          <p className="talent-modal__detail">
            Base en dólares: <strong>{floorUsd} USD</strong>
          </p>
        ) : null}
        {currentUser && floorUsd !== null ? (
          <form className="talent-modal__offer" onSubmit={handleSubmit}>
            <label className="talent-modal__field">
              Tu oferta en USD
              <input
                className="talent-modal__input"
                type="number"
                min={floorUsd}
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </label>
            {error ? (
              <p className="talent-modal__error" role="alert">
                {error}
              </p>
            ) : null}
            {sent ? <p className="talent-modal__success">Oferta enviada.</p> : null}
            <button className="talent-modal__submit" type="submit" disabled={submitting}>
              {submitting ? 'Enviando...' : 'Enviar oferta'}
            </button>
          </form>
        ) : null}
        {!currentUser ? (
          <p className="talent-modal__detail">Inicia sesión para enviar una oferta.</p>
        ) : null}
      </div>
    </div>
  );
};

export default TalentDetailModal;
