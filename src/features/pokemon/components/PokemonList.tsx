import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import PokemonNameSearch from "./PokemonNameSearch";
import PokemonTypeFiler from "./PokemonTypeFilter";
import PokemonSort from "./PokemonSort";
import PokemonAttackSearch from "./PokemonAttackSearch";
import { Pokemon } from "@/types/api";
import { usePokemon } from "../api/usePokemon";
import { usePagination } from "@/hooks/usePagination";

export default function PokemonList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [attack, setAttack] = useState(0);
  const pokemonPerPage = 12;

  const { data: pokemon, isLoading, error } = usePokemon();

  const filteredPokemon = useMemo(() => {
    if (!pokemon) return [];
    let result = [...pokemon];

    if (searchTerm) {
      result = result.filter(
        (pokemonItem) =>
          pokemonItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          Object.values(pokemonItem.stats).some((stat) =>
            stat.toString().includes(searchTerm)
          )
      );
    }

    if (typeFilter && typeFilter !== "none") {
      result = result.filter((pokemonItem) =>
        pokemonItem.types.includes(typeFilter)
      );
    }

    if (attack) {
      result = result.filter(
        (pokemonItem) => pokemonItem.stats.attack >= attack
      );
    }

    if (sortBy && sortBy !== "none") {
      result.sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else {
          return (
            b.stats[sortBy as keyof Pokemon["stats"]] -
            a.stats[sortBy as keyof Pokemon["stats"]]
          );
        }
      });
    }

    return result;
  }, [pokemon, searchTerm, typeFilter, attack, sortBy]);

  const {
    currentItems: currentPokemon,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination({ items: filteredPokemon, itemsPerPage: pokemonPerPage });

  if (isLoading)
    return (
      <div className=" h-screen flex justify-center items-center">
        <LoadingSpinner size={100} />
      </div>
    );
  if (error)
    return <div className="text-center mt-8 text-red-500">{error.message}</div>;

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
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </React.Fragment>
  );
}
