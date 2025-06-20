import type { PokemonListItem } from "../types/pokemonList";

export interface AppliedFilters {
  types: string[];
  habitats: string[];
  classification: string;
}

//  Check if any search or filter is active

export const hasActiveFilters = (
  searchText: string,
  appliedFilters: AppliedFilters
): boolean =>
  Boolean(
    searchText ||
    appliedFilters.types.length ||
    appliedFilters.habitats.length ||
    appliedFilters.classification
  );

//  Merge partial results with full Pokémon data

export const enrichResults = (
  results: PokemonListItem[],
  fullList: PokemonListItem[]
): PokemonListItem[] =>
  results.map((p) => {
    const full = fullList.find((f) => f.name === p.name);
    return full ? { ...full, ...p } : p;
  });

// Determine which Pokémon to display based on filters/search

export const getDisplayList = (params: {
  pokemonList: PokemonListItem[];
  visibleCount: number;
  filteredPokemon: PokemonListItem[] | null;
  searchText: string;
  appliedFilters: AppliedFilters;
}): PokemonListItem[] => {
  const { pokemonList, visibleCount, filteredPokemon, searchText, appliedFilters } = params;
  const fullList = pokemonList;
  const visibleSlice = fullList.slice(0, visibleCount);

  if (hasActiveFilters(searchText, appliedFilters)) {
    return filteredPokemon ?? fullList;
  }

  return visibleSlice;
};