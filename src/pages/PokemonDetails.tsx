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
// import { usePokemonContext } from "../global-state/contexts/PokemonContext";

const PokemonDetail = () => {
  // const { pokemonList, visibleCount, dispatch } = usePokemonContext();
  // const visiblePokemon = pokemonList.slice(0, visibleCount);
  const { selectedPokemon } = useParams<{ selectedPokemon: string }>();
  const { pokemonDetail, evolutionStages, evolutionPaths, loading } =
    usePokemonDetail(selectedPokemon || "");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!pokemonDetail) return;
    getIsPokemonAlreadyFavorited(pokemonDetail.id)
      .then(setIsFavorite)
      .catch(console.error);
  }, [pokemonDetail]);

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

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
      {/* <div className="md:hidden p-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-500 hover:underline"
        >
          <span className="text-xl">&larr;</span> Back to List
        </Link>
      </div> */}

      {/* Sidebar - Hidden on Mobile */}
      {/* <div className="hidden md:block h-screen overflow-y-auto w-[300px] no-scrollbar">
        {visiblePokemon.map((pokemon) => (
          <Link to={`/${pokemon.name}`} key={pokemon.id}>
            <PokemonNavCard pokemon={pokemon} />
          </Link>
        ))}
        {visibleCount < pokemonList.length && (
          <div className="flex justify-center mb-6">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              onClick={() => dispatch({ type: "LOAD_MORE" })}
            >
              Load More
            </button>
          </div>
        )}
      </div> */}

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
                {isFavorite ? (
                  <GoHeartFill className="text-red-500 w-6 h-6 md:w-8 md:h-8" />
                ) : (
                  <GoHeart className="text-gray-300 w-6 h-6 md:w-8 md:h-8" />
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
          <TypeDefense pokemon={pokemonDetail} />
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
