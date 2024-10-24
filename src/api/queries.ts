import { gql } from "@apollo/client";

export const GET_POKEMON_LIST = gql`
  query getPokemons {
    pokemon_v2_pokemon(limit: 151) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        pokemon_v2_stat {
          name
        }
        base_stat
      }
    }
  }
`;
