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

export interface PokemonType {
  pokemon_v2_type: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
  };
}

export interface PokemonSprite {
  sprites: {
    front_default: string;
  };
}

export interface PokemonDetails {
  id: number;
  name: string;
  pokemon_v2_pokemontypes: PokemonType[];
  pokemon_v2_pokemonstats: PokemonStat[];
  pokemon_v2_pokemonsprites: PokemonSprite[];
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
