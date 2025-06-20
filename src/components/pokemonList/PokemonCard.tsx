import { useState, useEffect } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import TypeBadge from "../common/TypeBadge";
import type { PokemonListItem } from "../../types/pokemonList";

import {
  addFavoritePokemon,
  removeFavoritePokemon,
  getIsPokemonAlreadyFavorited,
} from "../../services/backendApi";
import { toast } from "react-toastify";

interface PokemonCardProps {
  pokemon: PokemonListItem;
  onSelect?: (name: string) => void;
  onToggleFavorite?: (id: number, isFav: boolean) => void;
}

const PokemonCard = ({
  pokemon,
  onSelect,
  onToggleFavorite,
}: PokemonCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const favorited = await getIsPokemonAlreadyFavorited(pokemon.id);
        setIsFavorite(favorited);
      } catch (error) {
        console.error("Error checking favorite status", error);
      }
    };
    checkFavoriteStatus();
  }, [pokemon.id]);
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isFavorite) {
        await removeFavoritePokemon(String(pokemon.id));
        setIsFavorite(false);
        toast.info(`${capitalize(pokemon.name)} removed from favorites!`);
        onToggleFavorite?.(pokemon.id, false);
      } else {
        await addFavoritePokemon(String(pokemon.id), pokemon.name);
        setIsFavorite(true);
        toast.success(`${capitalize(pokemon.name)} added to favorites!`);
        onToggleFavorite?.(pokemon.id, true);
      }
    } catch (error) {
      console.error("Failed to toggle favorite", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center flex-col gap-4 bg-[#0F121F] w-90 overflow-clip px-4 rounded-2xl py-6"
      draggable={false}
      onClick={() => onSelect?.(pokemon.name)}
    >
      {isFavorite ? (
        <GoHeartFill
          className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
          onClick={(e) => toggleFavorite(e)}
        />
      ) : (
        <GoHeart
          className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
          onClick={(e) => toggleFavorite(e)}
        />
      )}

      <img
        src={
          pokemon.sprites?.other?.["official-artwork"]?.front_default ||
          pokemon.sprites?.front_default ||
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
        }
        alt={pokemon.name}
        draggable={false}
        className="absolute z-0 blur-[70px] rounded-lg w-[100%] h-[70%] object-cover"
      />
      <p className="font-light text-secondary text-xl">
        #{pokemon.id.toString().padStart(3, "0")}
      </p>
      <img
        src={
          pokemon.sprites?.other?.["official-artwork"]?.front_default ||
          pokemon.sprites?.front_default ||
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
        }
        alt={pokemon.name}
        draggable={false}
        className="object-cover z-10 w-[100%] h-auto"
      />
      <div className="flex flex-col item-center justify-center text-center">
        <p className="text-white text-xl capitalize">{pokemon.name}</p>
        <p className="text-secondary text-lg">
          {pokemon.japaneseName || "Unknown"}
        </p>
        <p className="text-md text-secondary capitalize">
          Generation {pokemon.generationName?.split("-")[1] || "Unknown"}
        </p>
      </div>
      <div className="flex gap-2 justify-center mt-2">
        {pokemon.types.map((type, index) => {
          const name =
            typeof type === "string" ? type : type?.type?.name || "unknown";
          return <TypeBadge key={index} type={name} />;
        })}
      </div>
    </div>
  );
};

export default PokemonCard;
