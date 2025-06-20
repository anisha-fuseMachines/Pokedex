import { useEffect, useState } from "react";
import {
  fetchPokemonDetails,
  fetchPokemonSpecies,
  fetchEvolutionChain,
} from "../services/pokeapi";
import type { EvolutionStages, PokemonDetail } from "../types/pokemonList";

interface EvolutionNode {
  name: string;
  method?: string;
}

export const usePokemonDetail = (name: string) => {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(
    null
  );
  const [evolutionStages, setEvolutionStages] = useState<EvolutionStages[]>([]);
  const [evolutionPaths, setEvolutionPaths] = useState<EvolutionNode[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;

    const load = async () => {
      setLoading(true);
      try {
        const [detail, species] = await Promise.all([
          fetchPokemonDetails(name),
          fetchPokemonSpecies(name),
        ]);

        const japaneseName = species.names.find(
          (n: any) => n.language.name === "ja-Hrkt"
        )?.name;

        const generationName = species.generation?.name;

        const genus = species.genera.find(
          (g: any) => g.language.name === "en"
        )?.genus;

        const enriched: PokemonDetail = {
          ...detail,
          japaneseName,
          generationName,
          genus,
          base_happiness: species.base_happiness,
          growth_rate: species.growth_rate,
          egg_groups: species.egg_groups,
          capture_rate: species.capture_rate,
        };

        setPokemonDetail(enriched);

        const evoUrl = species.evolution_chain?.url;
        if (!evoUrl) return;

        const evolutionData = await fetchEvolutionChain(evoUrl);
        const evolutionNames = extractEvolutionNames(evolutionData.chain);
        const paths = extractEvolutionPaths(evolutionData.chain);

        const evolutionDetails: EvolutionStages[] = await Promise.all(
          evolutionNames.map(async (evoName) => {
            const evo = await fetchPokemonDetails(evoName);
            return {
              name: evo.name,
              id: evo.id,
              sprite:
                evo.sprites.other["official-artwork"]?.front_default ||
                evo.sprites.front_default,
              types: evo.types.map((t: any) => t.type.name),
            };
          })
        );

        setEvolutionStages(evolutionDetails);
        setEvolutionPaths(paths);
      } catch (err) {
        console.error("Error loading full detail:", err);
        setPokemonDetail(null);
        setEvolutionStages([]);
        setEvolutionPaths([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [name]);

  return { pokemonDetail, evolutionStages, evolutionPaths, loading };
};

const extractEvolutionNames = (chain: any): string[] => {
  const names: string[] = [];

  const walk = (node: any) => {
    names.push(node.species.name);
    node.evolves_to.forEach(walk);
  };

  walk(chain);
  return [...new Set(names)];
};

const extractEvolutionPaths = (chain: any): EvolutionNode[][] => {
  const paths: EvolutionNode[][] = [];

  const walk = (node: any, path: EvolutionNode[] = []) => {
    const current: EvolutionNode = { name: node.species.name };
    if (path.length > 0 && node.evolution_details?.[0]) {
      const method = getEvolutionMethodText(node.evolution_details[0]);
      path.push({ ...current, method });
    } else {
      path.push(current);
    }

    if (node.evolves_to.length === 0) {
      paths.push([...path]);
    } else {
      node.evolves_to.forEach((child: any) => {
        walk(child, [...path]);
      });
    }
  };

  walk(chain);
  return paths;
};

const getEvolutionMethodText = (detail: any): string => {
  if (detail.min_level) return `Level ${detail.min_level}`;
  if (detail.item?.name) return `Use ${detail.item.name}`;
  if (detail.trigger?.name) return detail.trigger.name;
  return "Evolves";
};
