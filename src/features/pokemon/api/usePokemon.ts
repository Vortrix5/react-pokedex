import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "@/types/api";
import { fetchPokemonList } from "@/services/pokemonService";

export const usePokemon = () => {
  return useQuery<Pokemon[], Error>({
    queryKey: ["pokemon"],
    queryFn: fetchPokemonList,
  });
};
