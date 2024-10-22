import { Card, CardContent } from "@/components/ui/card";
import { ReactElement } from "react";

interface PokemonCardProps {
  pokemon: {
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
  };
}

const typeColors: { [key: string]: string } = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-600",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-700",
  ghost: "bg-purple-600",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  steel: "bg-gray-400",
  fairy: "bg-pink-300",
};

export default function PokemonCard({
  pokemon,
}: PokemonCardProps): ReactElement {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
          <span className="text-sm text-gray-500">
            #{pokemon.id.toString().padStart(3, "0")}
          </span>
        </div>
        <div className="relative">
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="w-32 h-32 mx-auto"
          />
          <div className="bottom-0 left-0 right-0 flex justify-center space-x-1">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
                  typeColors[type] || "bg-gray-500"
                }`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-start">
            <span className="font-semibold">HP:</span>
            <span>{pokemon.stats.hp}</span>
          </div>
          <div className="flex justify-start">
            <span className="font-semibold">Attack:</span>
            <span>{pokemon.stats.attack}</span>
          </div>
          <div className="flex justify-start">
            <span className="font-semibold">Defense:</span>
            <span>{pokemon.stats.defense}</span>
          </div>
          <div className="flex justify-start">
            <span className="font-semibold">Speed:</span>
            <span>{pokemon.stats.speed}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
