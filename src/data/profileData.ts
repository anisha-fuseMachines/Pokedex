import type { Gender, Pokemon, Region } from "../types/registration";
export const startersByRegion: Record<Region, Pokemon[]> = {
  Kanto: [
    {
      name: "Bulbasaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    },
    {
      name: "Charmander",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    },
    {
      name: "Squirtle",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    },
  ],
  Johto: [
    {
      name: "Chikorita",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png",
    },
    {
      name: "Cyndaquil",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/155.png",
    },
    {
      name: "Totodile",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/158.png",
    },
  ],
  Hoenn: [
    {
      name: "Treecko",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/252.png",
    },
    {
      name: "Torchic",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/255.png",
    },
    {
      name: "Mudkip",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/258.png",
    },
  ],
};
export const maleAvatar =
  "https://archives.bulbagarden.net/media/upload/6/6e/LucasChallenge_Overalls_1_BDSP.png";
export const femaleAvatar =
  "https://archives.bulbagarden.net/media/upload/7/7d/DawnChallenge_Platinum_1_BDSP.png?20211202131652";
