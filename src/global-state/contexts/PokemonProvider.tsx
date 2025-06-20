import { useReducer, useEffect } from "react";
import { PokemonContext, initialState } from "./PokemonContext";
import { pokemonReducer } from "../reducers/PokemonReducer";
import {
  fetchGen1To3PokemonNames,
  fetchPokemonDetails,
  fetchPokemonSpecies,
} from "../../services/pokeapi";
import type { PokemonListItem } from "../../types/pokemonList";

interface Props {
  children: React.ReactNode;
}

export const PokemonProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  useEffect(() => {
    const loadAllPokemon = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const speciesList = await fetchGen1To3PokemonNames();
        const enriched: PokemonListItem[] = [];

        for (const species of speciesList) {
          try {
            const [details, speciesData] = await Promise.all([
              fetchPokemonDetails(species.name),
              fetchPokemonSpecies(species.name),
            ]);

            enriched.push({
              id: details.id,
              name: details.name,
              sprites: details.sprites,
              types: details.types,
              japaneseName: speciesData.names.find(
                (n: any) => n.language.name === "ja-Hrkt"
              )?.name,
              generationName: speciesData.generation.name,
              order: speciesData.order,
            });
          } catch (err) {
            console.warn(`Skipping ${species.name}:`, err);
            continue;
          }
        }

        dispatch({ type: "SET_LIST", payload: enriched });
      } catch (err) {
        console.error("Failed to load Pokémon list:", err);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadAllPokemon();
  }, []);

  return (
    <PokemonContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
};
