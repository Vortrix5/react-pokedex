import { ContentLayout } from "@/components/layouts";
import PokemonList from "@/features/pokemon/components/PokemonList";

export default function Home() {
  return (
    <ContentLayout title={"Pokedex"}>
      <main className="container mx-auto py-10">
        <PokemonList />
      </main>
    </ContentLayout>
  );
}
