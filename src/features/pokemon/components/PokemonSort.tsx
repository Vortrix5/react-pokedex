import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortByOption, SortOptions } from "@/types/api";

type SortByProps = {
  setSortBy: (value: React.SetStateAction<SortOptions>) => void;
};

const sortItems: SortByOption[] = [
  { value: "none", label: "No Sort" },
  { value: "name", label: "Name" },
  { value: "hp", label: "HP" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "speed", label: "Speed" },
];

const PokemonSort = ({ setSortBy }: SortByProps) => {
  return (
    <Select onValueChange={(sortType) => setSortBy(sortType as SortOptions)}>
      <SelectTrigger className="w-full md:w-1/4">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PokemonSort;
