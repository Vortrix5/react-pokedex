import { Input } from "@/components/ui/input";
import { NameSearchProps } from "@/types/api";

const PokemonNameSearch = ({ searchTerm, setSearchTerm }: NameSearchProps) => {
  return (
    <Input
      placeholder="Search Pokémon..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full md:w-1/3"
    />
  );
};

export default PokemonNameSearch;
