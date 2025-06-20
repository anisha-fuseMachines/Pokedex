import { useState, useEffect } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import TypeBadge from "../common/TypeBadge";
import type { PokemonListItem } from "../../types/pokemonList";

import {
  addFavoritePokemon,
  removeFavoritePokemon,
  getIsPokemonAlreadyFavorited,
} from "../../services/backendApi";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

const PokemonNavCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div
      className="relative flex items-center flex-row gap-4 bg-[#0F121F] overflow-hidden  rounded-lg mb-4 w-[240px] p-4"
      draggable={false}
    >
      <img
        src={
          pokemon.sprites?.other?.["official-artwork"]?.front_default ||
          pokemon.sprites?.front_default ||
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
        }
        alt={pokemon.name}
        draggable={false}
        className="absolute z-0 blur-[70px] rounded-lg w-[75%] h-[70%] object-cover"
      />

      <img
        src={
          pokemon.sprites?.other?.["official-artwork"]?.front_default ||
          pokemon.sprites?.front_default ||
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
        }
        alt={pokemon.name}
        draggable={false}
        className="object-cover z-10 w-[35%] h-auto"
      />
      <div className="flex flex-col item-center justify-start text-left">
        <p className="font-light text-secondary text-sm">
          #{pokemon.id.toString().padStart(3, "0")}
        </p>
        <p className="text-white text-xl capitalize">{pokemon.name}</p>
        <p className="text-secondary text-md">
          {pokemon.japaneseName || "Unknown"}
        </p>
        <p className="text-sm text-secondary capitalize">
          Generation {pokemon.generationName?.split("-")[1] || "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default PokemonNavCard;
