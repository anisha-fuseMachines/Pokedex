import type { PokemonListItem } from "../../types/pokemonList";
import type { PokemonState } from "../contexts/PokemonContext";


export type PokemonAction =
  | { type: "SET_LIST"; payload: PokemonListItem[] }
  | { type: "SET_SEARCH_RESULTS"; payload: PokemonListItem[] }
  | { type: "CLEAR_SEARCH" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOAD_MORE" };

export const pokemonReducer = (
  state: PokemonState,
  action: PokemonAction
): PokemonState => {
  switch (action.type) {
    case "SET_LIST":
      return {
        ...state,
        pokemonList: action.payload,
        loading: false,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
        loading: false,
      };
    case "CLEAR_SEARCH":
      return {
        ...state,
        searchResults: [],
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "LOAD_MORE":
      return {
        ...state,
        visibleCount: state.visibleCount + 20,
      };
    default:
      return state;
  }
};
