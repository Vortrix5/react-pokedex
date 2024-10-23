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

export type SortOptions =
  | "none"
  | "name"
  | "hp"
  | "defense"
  | "attack"
  | "speed";

export type SortByOption = {
  value: SortOptions;
  label: string;
};
