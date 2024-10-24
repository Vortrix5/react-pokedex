import client from "../api/client";
import { GET_POKEMON_LIST } from "../api/queries";
import {
  Pokemon,
  PokemonDetails,
  PokemonStat,
  PokemonType,
} from "../types/api";

const mapStats = (
  stats: PokemonStat[]
): { hp: number; attack: number; defense: number; speed: number } => {
  const hp =
    stats.find((stat) => stat.pokemon_v2_stat.name === "hp")?.base_stat || 0;
  const attack =
    stats.find((stat) => stat.pokemon_v2_stat.name === "attack")?.base_stat ||
    0;
  const defense =
    stats.find((stat) => stat.pokemon_v2_stat.name === "defense")?.base_stat ||
    0;
  const speed =
    stats.find((stat) => stat.pokemon_v2_stat.name === "speed")?.base_stat || 0;

  return { hp, attack, defense, speed };
};

const mapTypes = (types: PokemonType[]): string[] => {
  return types.map((typeObj) => typeObj.pokemon_v2_type.name);
};

const mapPokemonData = (data: PokemonDetails[]): Pokemon[] => {
  return data.map((pokemon) => {
    const stats = mapStats(pokemon.pokemon_v2_pokemonstats);
    const types = mapTypes(pokemon.pokemon_v2_pokemontypes);
    const sprite = pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default;

    return {
      id: pokemon.id,
      name: pokemon.name,
      types,
      stats,
      sprite,
    };
  });
};

export const fetchPokemonList = async (): Promise<Pokemon[]> => {
  const response = await client.query<{ pokemon_v2_pokemon: PokemonDetails[] }>(
    {
      query: GET_POKEMON_LIST,
    }
  );
  return mapPokemonData(response.data.pokemon_v2_pokemon);
};
