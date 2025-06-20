export interface TypeConfigItem {
  border: string;
  text: string;
}

const typeStyles: Record<string, TypeConfigItem> = {
  fire: {
    border: "border-orange-500",
    text: "text-orange-500",
  },
  flying: {
    border: "border-blue-300",
    text: "text-blue-300",
  },
  water: {
    border: "border-blue-500",
    text: "text-blue-500",
  },
  grass: {
    border: "border-green-500",
    text: "text-green-500",
  },
  electric: {
    border: "border-yellow-400",
    text: "text-yellow-400",
  },
  ice: {
    border: "border-cyan-300",
    text: "text-cyan-300",
  },
  fighting: {
    border: "border-red-600",
    text: "text-red-600",
  },
  poison: {
    border: "border-purple-500",
    text: "text-purple-500",
  },
  ground: {
    border: "border-yellow-600",
    text: "text-yellow-600",
  },
  rock: {
    border: "border-gray-600",
    text: "text-gray-600",
  },
  bug: {
    border: "border-lime-500",
    text: "text-lime-500",
  },
  ghost: {
    border: "border-indigo-500",
    text: "text-indigo-500",
  },
  steel: {
    border: "border-gray-400",
    text: "text-gray-400",
  },
  dragon: {
    border: "border-purple-700",
    text: "text-purple-700",
  },
  dark: {
    border: "border-gray-400",
    text: "text-gray-400",
  },
  fairy: {
    border: "border-pink-400",
    text: "text-pink-400",
  },
  normal: {
    border: "border-gray-300",
    text: "text-gray-300",
  },
  psychic: {
    border: "border-pink-600",
    text: "text-pink-600",
  },
};

export const getTypeBadge = (type: string): TypeConfigItem => {
  const lowerType = type.toLowerCase();
  return (
    typeStyles[lowerType] || {
      border: "border-gray-300",
      text: "text-gray-800",
    }
  );
};
