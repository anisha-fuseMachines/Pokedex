import { useState, useEffect } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import TypeBadge from "../common/TypeBadge";
import type { PokemonListItem } from "../../types/pokemonList";
import { useAuth0 } from "@auth0/auth0-react";
import {
  addFavoritePokemon,
  removeFavoritePokemon,
  getIsPokemonAlreadyFavorited,
} from "../../services/backendApi";
import { toast } from "react-toastify";
import LoginModal from "../common/LoginModal";

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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const checkFavoriteStatus = async () => {
        try {
          const favorited = await getIsPokemonAlreadyFavorited(pokemon.id);
          setIsFavorite(favorited);
        } catch (error) {
          console.error("Error checking favorite status", error);
        }
      };
      checkFavoriteStatus();
    } else {
      setIsFavorite(false);
    }
  }, [pokemon.id, isAuthenticated]);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (isFavorite) {
        await removeFavoritePokemon(String(pokemon.id));
        setIsFavorite(false);
        toast.info(`${capitalize(pokemon.name)} removed from favorites!`, {
          icon: false,
          hideProgressBar: true,
        });
        onToggleFavorite?.(pokemon.id, false);
      } else {
        await addFavoritePokemon(String(pokemon.id), pokemon.name);
        setIsFavorite(true);
        toast.success(`${capitalize(pokemon.name)} added to favorites!`, {
          icon: false,
          hideProgressBar: true,
        });
        onToggleFavorite?.(pokemon.id, true);
      }
    } catch (error) {
      console.error("Failed to toggle favorite", error);
      toast.error("Something went wrong. Please try again.", {
        icon: false,
        hideProgressBar: true,
      });
    }
  };

  const handleLogin = (e: React.MouseEvent) => {
    e.stopPropagation();
    loginWithRedirect({
      appState: { returnTo: window.location.pathname },
    });
    setShowLoginModal(false);
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowLoginModal(false);
  };

  return (
    <div className="relative">
      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal isOpen={showLoginModal} onClose={handleCloseModal} />
      )}

      {/* Pokemon Card */}
      <div
        className="relative flex items-center justify-center flex-col gap-4 bg-[#0F121F] w-90 overflow-clip px-4 rounded-2xl py-6"
        draggable={false}
        onClick={() => onSelect?.(pokemon.name)}
      >
        {/* Heart Icon */}
        {isAuthenticated ? (
          isFavorite ? (
            <GoHeartFill
              className="absolute top-4 right-4 text-red-500 text-2xl cursor-pointer hover:scale-110 transition-all"
              onClick={toggleFavorite}
              title="Remove from favorites"
            />
          ) : (
            <GoHeart
              className="absolute top-4 right-4 text-white text-2xl cursor-pointer hover:scale-110 transition-all"
              onClick={toggleFavorite}
              title="Add to favorites"
            />
          )
        ) : (
          <GoHeart
            className="absolute top-4 right-4 text-gray-500 text-2xl cursor-pointer hover:text-white transition-colors"
            onClick={toggleFavorite}
            title="Login to favorite"
          />
        )}

        {/* Background Image */}
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

        {/* Pokemon Details */}
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
    </div>
  );
};

export default PokemonCard;
