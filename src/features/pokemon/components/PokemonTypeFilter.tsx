import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pokemon } from "@/types/api";

type TypeFilterProps = {
  setTypeFilter: (value: React.SetStateAction<string>) => void;
  pokemon: Pokemon[] | undefined;
};

const PokemonTypeFilter = ({ setTypeFilter, pokemon }: TypeFilterProps) => {
  return (
    <Select onValueChange={setTypeFilter}>
      <SelectTrigger className="w-full md:w-1/4">
        <SelectValue placeholder="Filter by type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">All Types</SelectItem>
        {Array.from(new Set(pokemon?.flatMap((p) => p.types))).map((type) => (
          <SelectItem key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PokemonTypeFilter;
