import { Button } from "@/components/ui/button";
import { ReactElement } from "react";

interface PaginationProps {
  pokemonPerPage: number;
  totalPokemon: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export default function Pagination({
  pokemonPerPage,
  totalPokemon,
  paginate,
  currentPage,
}: PaginationProps): ReactElement {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemon / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center space-x-2 mt-8">
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => paginate(number)}
          variant={currentPage === number ? "default" : "outline"}
          className={
            currentPage === number ? "bg-primary text-primary-foreground" : ""
          }
        >
          {number}
        </Button>
      ))}
    </div>
  );
}
