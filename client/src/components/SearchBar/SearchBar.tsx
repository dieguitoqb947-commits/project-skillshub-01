import { type ChangeEvent, type SubmitEvent,} from 'react';


export interface SearchBarProps {
    searchQuery: string;
    onSearchQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
    onClearSearch: () => void;
    hasActiveSearch: boolean;
}

export const SearchBar = ({
    searchQuery,
    onSearchQueryChange,
    onSearchSubmit,
    onClearSearch,
    hasActiveSearch,
  }: SearchBarProps) => (
    <form className="search-bar" onSubmit={onSearchSubmit}>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Buscar por habilidad o rol"
        value={searchQuery}
        onChange={onSearchQueryChange}
        required
      />
      <button className="search-bar__button" type="submit">
        Buscar
      </button>
      {hasActiveSearch && (
        <button className="search-bar__button" type="button" onClick={onClearSearch}>
          Limpiar
        </button>
      )}
    </form>
  );