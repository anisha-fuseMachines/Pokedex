export type PokemonListItem = {
  name: string;
  id: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": { front_default: string };
    };
  };
  types: { type: { name: string } }[];
  japaneseName?: string;
  generationName?: string;
  order?: number;
};

export type PokemonDetail = {
  name: string;
  id: number;
  sprites: {
    front_default: string;
    other: { "official-artwork": { front_default: string } };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  japaneseName?: string;
  generationName?: string;
  height: number;
  weight: number;
  genus?: string;
  capture_rate?: number;
  base_experience?: number;
  base_happiness?: number;
  growth_rate?: { name: string; url: string };
  egg_groups: { name: string; url: string }[];
};

export type EvolutionStages = {
  name: string;
  id: number;
  sprite: string;
  types: string[];
  trigger?: string;
  min_level?: number;
  item?: string;
  happiness?: number;
};

export interface PokemonContextType {
  pokemonList: PokemonListItem[];
  pokemonDetail: PokemonDetail | null;
  evolutionStages: EvolutionStages[];
  loading: boolean;
  detailLoading: boolean;
  visibleCount: number;
  total: number;
  loadMore: () => Promise<void>;
  loadSinglePokemonDetail: (name: string) => Promise<void>;
  searchPokemon: (query: string) => void;
  searchResults: PokemonListItem[];
}
export interface EvolutionDetail {
  trigger: string;
  minLevel?: number;
  item?: string;
  timeOfDay?: string;
  minHappiness?: number;
  location?: string;
  heldItem?: string;
  knownMove?: string;
  needsOverworldRain?: boolean;
}

export interface EvolutionStage {
  from: string;
  to: string;
  details: EvolutionDetail[];
  nextEvolutions: EvolutionStage[];
}
