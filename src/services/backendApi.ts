import axios, { AxiosError } from "axios";
import type { PokemonListItem } from "../types/pokemonList";

const BECient = axios.create({
  baseURL: import.meta.env.VITE_BASE_DATA_API_URL,
});

export const fetchFilters = async () => {
  try {
    const response = await BECient.get("/api/search/filters");
    return {
      types: response.data.types,
      habitats: response.data.habitats,
      classifications: response.data.classifications,
    };
  } catch (error) {
    throw new Error(
      `Failed to fetch filters: ${(error as AxiosError).message}`
    );
  }
};

export interface SearchParams {
  searchText?: string;
  types?: string[];
  habitats?: string[];
  classification?: string;
}

export const searchPokemonAPI = async (
  params: SearchParams
): Promise<PokemonListItem[]> => {
  try {
    const response = await BECient.post("/api/search", params);
    return response.data.results;
  } catch (error) {
    throw new Error(
      `Failed to search Pokémon: ${(error as AxiosError).message}`
    );
  }
};

const user = import.meta.env.VITE_BACKEND_USER;

export const addFavoritePokemon = async (id: string, name: string) => {
  await BECient.post("/api/favorites", {
    id,
    name,
    addedBy: user,
  });
};

export const removeFavoritePokemon = async (id: string) => {
  await BECient.delete("/api/favorites", {
    params: { id, addedBy: user },
  });
};

export const getFavoritePokemons = async (): Promise<any[]> => {
  const res = await BECient.get("/api/favorites", {
    params: { addedBy: user },
  });
  return res.data;
};

export const getIsPokemonAlreadyFavorited = async (
  pokemonId: number
): Promise<boolean> => {
  const res = await BECient.get("/api/favorites/isFavorite", {
    params: { addedBy: user, pokemonId },
  });
  return res.data.isFavorited;
};
