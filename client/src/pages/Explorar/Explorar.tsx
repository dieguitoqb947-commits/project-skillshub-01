import { SearchBar } from '../../components/SearchBar/SearchBar';
import './explorar.css';

const Explorar = () => {
  return (
    <section className="explorar" aria-labelledby="explorar-title">
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
        <SearchBar />
      </div>
    </section>
  );
};

export default Explorar;