import type { TypeMatchup, TypesMatch } from "../types/pokemonType";
import pokemonTypesMatch from "../data/pokemonTypesMatch.json";
import { typeColors } from "../data/constants";

export const getEffectColor = (effect: number) => {
  if (effect === 0) return "bg-gray-400"; // immune
  if (effect > 1) return "bg-red-300"; // weak
  if (effect < 1) return "bg-blue-300"; // resist
  return "bg-transparent"; // normal
};

export const getEffectLabel = (effect: number) => {
  if (effect === 0) return "0";
  if (effect === 0.25) return "¼";
  if (effect === 0.5) return "½";
  if (effect === 1) return "";
  if (effect === 2) return "2";
  if (effect === 4) return "4";
  return effect.toString();
};

export const getEffectDescription = (effect: number, type: string) => {
  if (effect === 0) return `${type} has no effect`;
  if (effect === 0.25) return `${type} is ¼x effective`;
  if (effect === 0.5) return `${type} is not very effective`;
  if (effect === 1) return `${type} is normally effective`;
  if (effect === 2) return `${type} is 2x effective`;
  if (effect === 4) return `${type} is 4x effective`;
  return `${type} is ${effect}x effective`;
};

export function getCombinedDefense(types: string[]): TypeMatchup {
  const matchData = pokemonTypesMatch as TypesMatch;
  const result: TypeMatchup = {};

  Object.keys(typeColors).forEach((attackingType) => {
    let effect = 1;
    types.forEach((defType) => {
      const typeEffect =
        matchData[defType.toLowerCase()]?.[attackingType.toLowerCase()] ?? 1;
      effect *= typeEffect;
    });
    result[attackingType] = effect;
  });

  return result;
}
