import { Input } from "@/components/ui/input";

type NameSearchProps = {
  searchTerm: string;
  setSearchTerm: (value: React.SetStateAction<string>) => void;
};

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
