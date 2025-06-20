import axios, { AxiosError } from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_POKE_API_URL,
});

export interface PokemonListResponse {
  results: { name: string; url: string }[];
  count: number;
}

export const fetchGen1To3PokemonNames = async () => {
  const gens = [1, 2, 3];

  const speciesLists = await Promise.all(
    gens.map((gen) => client.get(`generation/${gen}/`))
  );

  const combinedSpecies = speciesLists.flatMap(
    (res) => res.data.pokemon_species
  );

  const detailedSpecies = await Promise.all(
    combinedSpecies.map(async (species: { name: string; url: string }) => {
      const res = await fetchPokemonSpecies(species.name);
      return {
        name: res.name,
        url: `${import.meta.env.VITE_POKE_API_URL}pokemon-species/${res.name}/`,
        order: res.order,
      };
    })
  );

  const sortedSpecies = detailedSpecies.sort((a, b) => a.order - b.order);

  return sortedSpecies;
};

export const fetchPokemonList = async (
  limit = 1000,
  offset = 0
): Promise<PokemonListResponse> => {
  try {
    const response = await client.get(
      `pokemon?limit=${limit}&offset=${offset}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch Pokémon list: ${(error as AxiosError).message}`
    );
  }
};

export const getAllGeneration = async () => {
  try {
    const response = await client.get("generation");
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch generations: ${(error as AxiosError).message}`
    );
  }
};

export const getGenerationPokemon = async (generationUrl: string) => {
  try {
    const response = await axios.get(generationUrl);
    return response.data.pokemon_species;
  } catch (error) {
    throw new Error(
      `Failed to fetch generation Pokémon: ${(error as AxiosError).message}`
    );
  }
};

export const fetchPokemonDetails = async (name: string) => {
  try {
    const response = await client.get(`pokemon/${name}`);
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch Pokémon details: ${(error as AxiosError).message}`
    );
  }
};

export const fetchPokemonSpecies = async (name: string) => {
  try {
    const response = await client.get(`pokemon-species/${name}`);
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch Pokémon species: ${(error as AxiosError).message}`
    );
  }
};

export const fetchEvolutionChain = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch evolution chain");
    return res.json();
  } catch (error) {
    throw new Error(
      `Failed to fetch evolution chain: ${(error as Error).message}`
    );
  }
};
