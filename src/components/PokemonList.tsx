import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import { LoadingSpinner } from "./ui/loading";

interface Pokemon {
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

export default function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pokemonPerPage = 12;

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      const formattedPokemon: Pokemon[] = pokemonDetails.map((p: any) => ({
        id: p.id,
        name: p.name,
        types: p.types.map((t: any) => t.type.name),
        stats: {
          hp: p.stats.find((s: any) => s.stat.name === "hp").base_stat,
          attack: p.stats.find((s: any) => s.stat.name === "attack").base_stat,
          defense: p.stats.find((s: any) => s.stat.name === "defense")
            .base_stat,
          speed: p.stats.find((s: any) => s.stat.name === "speed").base_stat,
        },
        sprite: p.sprites.front_default,
      }));
      setPokemon(formattedPokemon);
      setFilteredPokemon(formattedPokemon);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      setError("Failed to fetch Pokemon. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = pokemon;

    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          Object.values(p.stats).some((stat) =>
            stat.toString().includes(searchTerm)
          )
      );
    }

    if (typeFilter && typeFilter !== "none") {
      result = result.filter((p) => p.types.includes(typeFilter));
    }

    if (sortBy && sortBy !== "none") {
      result.sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else {
          return (
            b.stats[sortBy as keyof typeof b.stats] -
            a.stats[sortBy as keyof typeof a.stats]
          );
        }
      });
    }

    setFilteredPokemon(result);
    setCurrentPage(1);
  }, [searchTerm, typeFilter, sortBy, pokemon]);

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading)
    return (
      <div className=" h-screen flex justify-center items-center">
        <LoadingSpinner size={100} />
      </div>
    );
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Pokedex</h1>
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <Input
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3"
            />
            <Select onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-1/4">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">All Types</SelectItem>
                {Array.from(new Set(pokemon.flatMap((p) => p.types))).map(
                  (type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <Select onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-1/4">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Sort</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="hp">HP</SelectItem>
                <SelectItem value="attack">Attack</SelectItem>
                <SelectItem value="defense">Defense</SelectItem>
                <SelectItem value="speed">Speed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <Pagination
        pokemonPerPage={pokemonPerPage}
        totalPokemon={filteredPokemon.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
