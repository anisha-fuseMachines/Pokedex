import type { Pokemon } from "../../types/registration";

export const StarterCard = ({
  pokemon,
  selectedStarter,
  setStarter,
}: {
  pokemon: Pokemon;
  selectedStarter: string;
  setStarter: (name: string) => void;
}) => {
  const isGrass = ["Bulbasaur", "Chikorita", "Treecko"].includes(pokemon.name);
  const isFire = ["Charmander", "Cyndaquil", "Torchic"].includes(pokemon.name);
  const typeColor = isGrass ? "green" : isFire ? "orange" : "blue";
  const typeName = isGrass ? "Grass" : isFire ? "Fire" : "Water";

  return (
    <div className="relative">
      <div
        className={`p-6 rounded-xl border-2 transition-all transform ${
          selectedStarter === pokemon.name
            ? `border-${typeColor}-500 bg-${typeColor}-50 shadow-lg scale-105`
            : "border-gray-200 hover:border-gray-300"
        }`}
        style={{
          background: "linear-gradient(145deg, #f9f9f9, #eaeaea)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Decorative Pokémon card elements */}
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-yellow-400 opacity-30"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-red-500 opacity-30"></div>

        <div className="flex flex-col items-center">
          {/* Pokémon image with decorative background */}
          <div className="relative w-32 h-32 mb-4">
            <div
              className={`absolute inset-0 bg-${typeColor}-200 rounded-full blur-sm opacity-30`}
            ></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="bg-white rounded-full p-2 border-4 border-white shadow-lg">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800">{pokemon.name}</h3>
          <div className="mt-2">
            <span
              className={`capitalize px-3 py-1 rounded-full text-xs font-bold ${
                selectedStarter === pokemon.name
                  ? `bg-${typeColor}-300 text-${typeColor}-900`
                  : `bg-${typeColor}-100 text-${typeColor}-800`
              }`}
            >
              {typeName}
            </span>
          </div>
        </div>
      </div>

      {/* Selection indicator */}
      {selectedStarter === pokemon.name && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
      )}

      <button
        onClick={() => setStarter(pokemon.name)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label={`Select ${pokemon.name}`}
      />
    </div>
  );
};

export const SelectionSummary = ({
  starter,
  region,
  starters,
}: {
  starter: string;
  region: string;
  starters: Pokemon[];
}) => {
  const pokemon = starters.find((p) => p.name === starter);

  if (!pokemon) return null;

  return (
    <div className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
      <div className="relative">
        <div className={`absolute inset-0`}></div>
        <div className="flex flex-row items-center gap-2">
          <div className="relative w-16 h-16 bg-white rounded-full border-2 border-gray-300 overflow-hidden">
            <img
              src={pokemon.image}
              alt={starter}
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="mt-3 text-md text-gray-600 italic">
            {pokemon.name}, will accompany you on your journey through {region}
          </div>
        </div>
      </div>
    </div>
  );
};
