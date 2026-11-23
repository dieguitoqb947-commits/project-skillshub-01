import type { TalentProfile } from '../../types/index';
import './talentCard.css';

type TalentCardProps = {
  profile: TalentProfile;
  onOpen: (profile: TalentProfile) => void;
};

const TalentCard = ({ profile, onOpen }: TalentCardProps) => {
  const initial = profile.fullName.trim().charAt(0).toUpperCase();

  return (
    <article className="talent-card">
      <header className="talent-card__header">
        <p className="talent-card__category">{profile.category}</p>
        <h2 className="talent-card__title">{profile.roleTitle}</h2>
      </header>

      <div className="talent-card__person">
        <span className="talent-card__avatar" aria-hidden="true">
          {initial}
        </span>
        <div>
          <p className="talent-card__name">{profile.fullName}</p>
          <p className="talent-card__location">{profile.location}</p>
        </div>
      </div>

      <ul className="talent-card__skills">
        {profile.keySkills.map((skill) => (
          <li className="talent-card__skill" key={skill}>
            {skill}
          </li>
        ))}
      </ul>

      <footer className="talent-card__footer">
        <span className="talent-card__compensation-label">Compensación base</span>
        <strong className="talent-card__compensation">
          {new Intl.NumberFormat('es', {
            style: 'currency',
            currency: profile.currency,
            currencyDisplay: 'code',
            maximumFractionDigits: 0,
          }).format(profile.baseCompensation)}
        </strong>
      </footer>
      <button type="button" className="talent-card__button" onClick={() => onOpen(profile)}>
        Ver perfil
      </button>
    </article>
  );
};

export default TalentCard;
