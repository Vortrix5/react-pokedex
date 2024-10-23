import { Input } from "@/components/ui/input";

type AttackSearchProps = {
  searchTerm: number;
  setAttack: (value: React.SetStateAction<number>) => void;
};

const PokemonAttackSearch = ({ searchTerm, setAttack }: AttackSearchProps) => {
  return (
    <Input
      type="number"
      placeholder="Search by attack..."
      value={searchTerm ? searchTerm : ""}
      onChange={(e) => {
        isNaN(e.target.valueAsNumber)
          ? setAttack(0)
          : setAttack(e.target.valueAsNumber);
      }}
      className="w-full md:w-2/12"
    />
  );
};

export default PokemonAttackSearch;
