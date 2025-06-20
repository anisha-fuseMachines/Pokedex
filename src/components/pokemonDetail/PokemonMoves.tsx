import React, { useState } from "react";
import type { PokemonDetail } from "../../types/pokemonList";

interface PokemonMovesProps {
  moves: PokemonDetail["moves"];
}

const PokemonMoves: React.FC<PokemonMovesProps> = ({ moves }) => {
  const [showAllMoves, setShowAllMoves] = useState(false);
  const initialMovesToShow = 20; // Number of moves to show initially

  const formatMoveName = (name: string) => {
    return name
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  const movesToDisplay = showAllMoves
    ? moves
    : moves.slice(0, initialMovesToShow);

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-white">Moves</h3>
        {moves.length > initialMovesToShow && (
          <button
            onClick={() => setShowAllMoves(!showAllMoves)}
            className="text-sm text-blue-300 hover:text-blue-100 transition-colors"
          >
            {showAllMoves ? "Show Less" : `View All (${moves.length})`}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {movesToDisplay.map((move, index) => (
          <div
            key={`${move.move.name}-${index}`}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center text-white text-sm capitalize
                      hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-default
                      border border-white/10 shadow-md"
          >
            {formatMoveName(move.move.name)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonMoves;
