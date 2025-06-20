import { createContext, useContext } from "react";
import type {
  EvolutionStages,
  PokemonDetail,
  PokemonListItem,
} from "../../types/pokemonList";
import type { PokemonAction } from "../reducers/PokemonReducer";

export interface PokemonState {
  pokemonList: PokemonListItem[];
  pokemonDetail: PokemonDetail | null;
  searchResults: PokemonListItem[];
  visibleCount: number;
  total: number;
  loading: boolean;
  detailLoading: boolean;
}

export interface PokemonContextType extends PokemonState {
  dispatch: React.Dispatch<PokemonAction>;
}

export const PokemonContext = createContext<PokemonContextType>(
  {} as PokemonContextType
);

export const usePokemonContext = () => useContext(PokemonContext);

export const initialState: PokemonState = {
  pokemonList: [],
  pokemonDetail: null,
  searchResults: [],
  visibleCount: 20,
  total: 0,
  loading: false,
  detailLoading: false,
};
