import { Link } from "react-router-dom";

const NoFavorite = () => {
  return (
    <div className="[height:calc(100vh_-_67px)] flex flex-col justify-center items-center p-6">
      <img src="/assets/noFavorite.gif" alt="Pikachu looking sad" />

      <h1 className="text-4xl text-yellow-400 font-semibold mb-3 text-center">
        No favorites yet!
      </h1>

      <p className="text-gray-300 mb-6 max-w-sm text-center">
        Pikachu noticed you haven’t added any Pokémon to your favorites. Start
        catching some to see them here!
      </p>

      <Link
        to="/"
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-full transition-colors"
      >
        Browse Pokémon
      </Link>
    </div>
  );
};

export default NoFavorite;
