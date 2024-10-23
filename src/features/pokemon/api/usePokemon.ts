import { useQuery } from "@tanstack/react-query";
import { Pokemon, PokemonApiResponse, PokemonDetails } from "@/types/api";

const fetchPokemon = async (): Promise<Pokemon[]> => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data: PokemonApiResponse = await response.json();
  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json() as Promise<PokemonDetails>;
    })
  );
  return pokemonDetails.map((pokemonDetail: PokemonDetails) => ({
    id: pokemonDetail.id,
    name: pokemonDetail.name,
    types: pokemonDetail.types.map((typeInfo) => typeInfo.type.name),
    stats: {
      hp:
        pokemonDetail.stats.find((statInfo) => statInfo.stat.name === "hp")
          ?.base_stat || 0,
      attack:
        pokemonDetail.stats.find((statInfo) => statInfo.stat.name === "attack")
          ?.base_stat || 0,
      defense:
        pokemonDetail.stats.find((statInfo) => statInfo.stat.name === "defense")
          ?.base_stat || 0,
      speed:
        pokemonDetail.stats.find((statInfo) => statInfo.stat.name === "speed")
          ?.base_stat || 0,
    },
    sprite: pokemonDetail.sprites.front_default,
  }));
};

export const usePokemon = () => {
  return useQuery<Pokemon[], Error>({
    queryKey: ["pokemon"],
    queryFn: fetchPokemon,
  });
};
