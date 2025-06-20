import { Link } from "react-router-dom";

const NoDetailFound = ({ pokemonName }: { pokemonName: string }) => {
  return (
    <div className="[height:calc(100vh_-_67px)] flex justify-center items-center flex-col">
      <img src="/assets/NoDetailFound.png" className="mb-3" />
      <h1 className="text-5xl text-white font-bold mb-4">Pokémon Not Found!</h1>
      <p className="text-xl mb-6 text-secondary">
        We couldn't find any Pokémon named{" "}
        <span className="font-bold capitalize text-secondary">
          {pokemonName}
        </span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 bg-indigo-200 hover:bg-indigo-300 text-secondary font-bold py-3 px-6 rounded-full transition-colors"
        >
          Go Home
        </Link>
      </div>

      <div className="mt-8 text-sm text-white/80">
        <p>
          Tip: Check your spelling or try searching for a different Pokémon.
        </p>
      </div>
    </div>
  );
};

export default NoDetailFound;
