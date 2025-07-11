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
    const getPokemonData = async (pokemonName: string) => {
      try {
        const [details, species] = await Promise.all([
          fetchPokemonDetails(pokemonName),
          fetchPokemonSpecies(pokemonName),
        ]);
        const japaneseName = species.names.find(
          (name: any) => name.language.name === "ja-Hrkt"
        )?.name;

        // Return formatted data
        return {
          id: details.id,
          name: details.name,
          sprites: details.sprites,
          types: details.types,
          japaneseName,
          generationName: species.generation.name,
          order: species.order,
        };
      } catch (error) {
        console.warn(`Skipping ${pokemonName}:`, error);
        return null;
      }
    };

    const loadFirstBatch = async (allPokemon: any[]) => {
      const firstBatchData: PokemonListItem[] = [];

      for (const pokemon of allPokemon.slice(0, 20)) {
        const data = await getPokemonData(pokemon.name);
        if (data) firstBatchData.push(data);
      }

      dispatch({ type: "SET_LIST", payload: firstBatchData });
    };

    const loadRestInBackground = async (allPokemon: any[]) => {
      for (const pokemon of allPokemon.slice(20)) {
        const data = await getPokemonData(pokemon.name);
        if (data) {
          dispatch({
            type: "APPEND_TO_LIST",
            payload: [data],
          });
        }
      }
    };

    const loadAllPokemon = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const allPokemon = await fetchGen1To3PokemonNames();

        await loadFirstBatch(allPokemon);
        loadRestInBackground(allPokemon);
      } catch (error) {
        console.error("Failed to load Pokémon:", error);
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
