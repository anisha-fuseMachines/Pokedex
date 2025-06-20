const typeIcons: Record<string, string> = {
  fire: "/assets/types/Fire.png",
  flying: "/assets/types/Flying.png",
  water: "/assets/types/Water.png",
  grass: "/assets/types/Grass.png",
  electric: "/assets/types/Electric.png",
  ice: "/assets/types/Ice.png",
  fighting: "/assets/types/Fight.png",
  poison: "/assets/types/Poison.png",
  ground: "/assets/types/Ground.png",
  rock: "/assets/types/Rock.png",
  bug: "/assets/types/Bug.png",
  ghost: "/assets/types/Ghost.png",
  steel: "/assets/types/Steel.png",
  dragon: "/assets/types/Dragon.png",
  dark: "/assets/types/Dark.png",
  fairy: "/assets/types/Fairy.png",
  normal: "/assets/types/Normal.png",
  psychic: "/assets/types/Psychic.png",
};

export const getTypeIcon = (type: string): string => {
  const lowerType = type.toLowerCase();
  return typeIcons[lowerType] || "";
};
