import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortByProps } from "@/types/api";

const PokemonSort = ({ setSortBy }: SortByProps) => {
  return (
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
  );
};

export default PokemonSort;
