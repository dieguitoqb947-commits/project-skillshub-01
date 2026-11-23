import { useState, type SubmitEvent } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import CurrencyConverter from '../../components/CurrencyConverter/CurrencyConverter';
import TalentCard from '../../components/TalentCard/TalentCard';
import TalentDetailModal from '../../components/TalentDetailModal/TalentDetailModal';
import { CurrencyProvider } from '../../context/CurrencyContext';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import { TALENT_PROFILES } from '../../utils/talentData';
import type { TalentProfile } from '../../types';
import './explorar.css';


const Explorar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedQuery, setAppliedQuery] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedProfile, setSelectedProfile] = useState<TalentProfile | null>(null);

   const onSearchSubmit = (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (searchQuery.trim().length > 0) {
        setAppliedQuery(searchQuery);
      } else {
        setAppliedQuery(null);
      }
      setVisibleCount(ITEMS_PER_PAGE);
   };

   const onClearSearch = () => {
    setAppliedQuery(null);
    setSearchQuery('');
    setVisibleCount(ITEMS_PER_PAGE);
   };

   const filteredProfiles = () => {
    const query = appliedQuery?.trim().toLowerCase();
    if (!query) return TALENT_PROFILES;

    return TALENT_PROFILES.filter((profile) => {
      const skills = profile.keySkills.join(' ').toLowerCase();

      return (
        profile.roleTitle.toLowerCase().includes(query) ||
        profile.fullName.toLowerCase().includes(query) ||
        profile.category.toLowerCase().includes(query) ||
        profile.location.toLowerCase().includes(query) ||
        skills.includes(query)
      );
    });
   }; 

   const profiles = filteredProfiles();
   const visibleProfiles = profiles.slice(0, visibleCount);
   const hasMore = visibleCount < profiles.length;


  return (
    <CurrencyProvider>
    <section className="explorar" aria-labelledby="explorar-title">
      <aside className="explorar__panel">
      <h2 className="explorar__panel-title" id="explorar-title">
          Skills<span className="explorar__panel-title-accent">Hub</span>
        </h2>
        <CurrencyConverter />
      </aside>
      <div className="explorar__main">
        <header className="explorar__intro">
          <h1 className="explorar__title" id="explorar-title">
            Encuentra talento para tu equipo
          </h1>
          <p className="explorar__lead">
            Busca por habilidad, categoría o ubicación. Compara la compensación base en
            tu moneda y revisa perfiles listos para ofertas competitivas.
          </p>
        </header>
        <div className="explorar__search">
          <SearchBar
            searchQuery={searchQuery}
            onSearchQueryChange={(event) => setSearchQuery(event.target.value)}
            onSearchSubmit={onSearchSubmit}
            onClearSearch={onClearSearch}
            hasActiveSearch={searchQuery.trim().length > 0}
          />
        </div>
        {profiles.length === 0 ? (
          <p className="explorar__empty">No hay perfiles que coincidan con tu búsqueda.</p>
        ) : (
          <>
            <ul className="explorar__grid">
              {visibleProfiles.map((profile) => (
                <li key={profile.id}>
                  <TalentCard profile={profile} onOpen={setSelectedProfile} />
                </li>
              ))}
            </ul>
            {hasMore ? (
              <button
                type="button"
                className="explorar__load-more"
                onClick={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)}
              >
                Cargar más
              </button>
            ) : null}
          </>
        )}
      </div>
    </section>
    <TalentDetailModal
      profile={selectedProfile}
      onClose={() => setSelectedProfile(null)}
    />
    </CurrencyProvider>
  );
};

export default Explorar;