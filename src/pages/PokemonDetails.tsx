import { Link, useParams } from "react-router-dom";
import AbilityStat from "../components/pokemonDetail/AbilityStat";
import BasicDetails from "../components/pokemonDetail/BasicDetails";
import TypeDefense from "../components/pokemonDetail/TypeDefense";
import EvolutionChain from "../components/pokemonDetail/EvolutionChain";
import Loader from "../components/common/Loader";
import { getTypeIcon } from "../utils/getTypeIcon";
import { usePokemonDetail } from "../hooks/usePokemondetails";
import {
  getIsPokemonAlreadyFavorited,
  addFavoritePokemon,
  removeFavoritePokemon,
} from "../services/backendApi";
import { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import PokemonMoves from "../components/pokemonDetail/PokemonMoves";
import NoDetailFound from "../components/common/NoDetailFound";
import { useAuth0 } from "@auth0/auth0-react";
import LoginModal from "../components/common/LoginModal"; // Import from separate file

const PokemonDetail = () => {
  const { selectedPokemon } = useParams<{ selectedPokemon: string }>();
  const { pokemonDetail, evolutionStages, evolutionPaths, loading } =
    usePokemonDetail(selectedPokemon || "");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuth0(); // Remove loginWithRedirect here

  useEffect(() => {
    if (!pokemonDetail || !isAuthenticated) return;

    getIsPokemonAlreadyFavorited(pokemonDetail.id)
      .then(setIsFavorite)
      .catch(console.error);
  }, [pokemonDetail, isAuthenticated]);

  if (!selectedPokemon || !pokemonDetail) {
    return <NoDetailFound pokemonName={selectedPokemon || "Unknown"} />;
  }

  if (loading) {
    return <Loader />;
  }

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!pokemonDetail) return;

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (isFavorite) {
        await removeFavoritePokemon(String(pokemonDetail.id));
        setIsFavorite(false);
      } else {
        await addFavoritePokemon(String(pokemonDetail.id), pokemonDetail.name);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowLoginModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
      {/* Use LoginModal component */}
      <LoginModal isOpen={showLoginModal} onClose={handleCloseModal} />

      {/* Main Content */}
      <div className="flex flex-col p-4 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-500 hover:underline"
        >
          <span className="text-xl">&larr;</span> Back to List
        </Link>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 items-center md:items-start">
          {/* Basic Information */}
          <div className="basic-information md:col-span-2 w-full">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-6xl font-light text-white capitalize">
                {pokemonDetail.name}
              </h1>
              <div className="flex gap-1">
                {pokemonDetail.types.map((typeData) => {
                  const typeIcon = getTypeIcon(typeData.type.name);
                  return typeIcon ? (
                    <img
                      key={typeData.type.name}
                      src={typeIcon}
                      alt={`${typeData.type.name} type`}
                      className="w-8 h-8 md:w-12 md:h-12"
                      title={typeData.type.name}
                    />
                  ) : null;
                })}
              </div>
              <button
                onClick={toggleFavorite}
                className="focus:outline-none ml-auto"
              >
                {isAuthenticated ? (
                  isFavorite ? (
                    <GoHeartFill className="text-red-500 w-6 h-6 md:w-8 md:h-8 hover:scale-110 transition-all" />
                  ) : (
                    <GoHeart className="text-white w-6 h-6 md:w-8 md:h-8 hover:scale-110 transition-all" />
                  )
                ) : (
                  <GoHeart className="text-gray-500 w-6 h-6 md:w-8 md:h-8 hover:text-white transition-colors" />
                )}
              </button>
            </div>
            <span className="text-secondary text-sm md:text-base">
              {pokemonDetail.genus}
            </span>

            {/* Sprite - Mobile */}
            <div className="relative w-full max-w-xs mx-auto my-4 md:hidden">
              <img
                src={
                  pokemonDetail.sprites.other["official-artwork"].front_default
                }
                draggable="false"
                className="absolute inset-0 w-full h-full object-contain rounded-full blur-[50px] z-0 opacity-70"
                alt=""
              />
              <img
                src={
                  pokemonDetail.sprites.other["official-artwork"].front_default
                }
                alt={pokemonDetail.name}
                className="relative z-10 w-full h-full object-contain"
              />
            </div>

            <BasicDetails pokemonDetail={pokemonDetail} />
          </div>

          {/* Sprite - Desktop */}
          <div className="relative w-full max-w-xs md:max-w-none mx-auto md:mx-0 md:w-64 md:h-64 lg:w-80 lg:h-80 hidden md:flex items-center justify-center">
            <img
              src={
                pokemonDetail.sprites.other["official-artwork"].front_default
              }
              draggable="false"
              className="absolute inset-0 w-full h-full object-contain rounded-full blur-[70px] z-0"
              alt=""
            />
            <img
              src={
                pokemonDetail.sprites.other["official-artwork"].front_default
              }
              alt={pokemonDetail.name}
              className="relative z-10 w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Stats + Type Defense */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-6">
          <AbilityStat pokemonDetail={pokemonDetail} />
          <TypeDefense pokemonType={pokemonDetail.types} />
        </div>

        {/* Moves */}
        <div className="mt-4 md:mt-6">
          <PokemonMoves moves={pokemonDetail.moves} />
        </div>

        {/* Evolution Chain */}
        {evolutionStages.length > 0 && (
          <div className="mt-4 md:mt-6">
            <EvolutionChain
              evolutionStages={evolutionStages}
              evolutionPaths={evolutionPaths}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;
