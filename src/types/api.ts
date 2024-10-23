export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  sprite: string;
}

export interface PokemonApiResponse {
  results: {
    url: string;
  }[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
}

export interface PaginationProps {
  pokemonPerPage: number;
  totalPokemon: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export type NameSearchProps = {
  searchTerm: string;
  setSearchTerm: (value: React.SetStateAction<string>) => void;
};

export type AttackSearchProps = {
  searchTerm: number;
  setAttack: (value: React.SetStateAction<number>) => void;
};

export type SortByProps = {
  setSortBy: (value: React.SetStateAction<string>) => void;
};

export type TypeFilterProps = {
  setTypeFilter: (value: React.SetStateAction<string>) => void;
  pokemon: Pokemon[] | undefined;
};
