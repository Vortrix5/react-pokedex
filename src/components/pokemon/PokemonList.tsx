import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import PokemonNameSearch from "./PokemonNameSearch";
import PokemonTypeFiler from "./PokemonTypeFilter";
import PokemonSort from "./PokemonSort";
import PokemonAttackSearch from "./PokemonAttackSearch";
import { Pokemon } from "@/types/api";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [attack, setAttack] = useState(0);
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

    if (attack) {
      result = result.filter((p) => p.stats.attack >= attack);
      console.log(result);
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
  }, [attack, searchTerm, typeFilter, sortBy, pokemon]);

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
    <React.Fragment>
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <PokemonNameSearch
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />
            <PokemonAttackSearch setAttack={setAttack} searchTerm={attack} />
            <PokemonTypeFiler setTypeFilter={setTypeFilter} pokemon={pokemon} />
            <PokemonSort setSortBy={setSortBy} />
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
    </React.Fragment>
  );
}
