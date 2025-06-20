import React from "react";
import {
  getCombinedDefense,
  getEffectColor,
  getEffectDescription,
  getEffectLabel,
} from "../../utils/getDefenseData";
// import type { TypeDefenseProps } from "../../types/pokemonType";
import { typeAbbreviations, typeGroups } from "../../data/constants";
import type { PokemonDetail } from "../../types/pokemonList";
interface TypeDefenseProps {
  pokemonType: PokemonDetail["types"];
}
const TypeDefense = ({ pokemonType }: TypeDefenseProps) => {
  const types = pokemonType.map((t) => t.type.name) ?? [];
  if (!types || types.length === 0) {
    return <div>Unknown types</div>;
  }

  const defense = getCombinedDefense(types);

  const allTypes = typeGroups[0];

  return (
    <div className="bg-linear-(--custom-gradient) rounded-lg py-6 px-8 w-full h-auto text-white">
      <h2 className="mb-2 text-left font-medium w-full text-lg ">
        Type Defense{" "}
      </h2>
      <h3 className="my-3 text-lg font-normal text-secondary">
        The effectiveness of each type on{" "}
        {/* <em className="italic">{pokemonType}</em>. */}
      </h3>

      <div className="grid grid-cols-6 gap-2 mb-3">
        {allTypes.map((type) => {
          const effect = defense[type] ?? 1;
          return (
            <div
              key={type}
              className="flex flex-col items-center p-1 group relative"
              title={getEffectDescription(effect, type)}
            >
              <div className="text-xs font-semibold text-gray-600 mb-1">
                {typeAbbreviations[type]}
              </div>
              <div
                className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-md
                    ${getEffectColor(effect)}
                    ${effect === 1 ? "border border-gray-300" : ""}
                    transition-all duration-200
                    group-hover:scale-110 group-hover:shadow-md
                  `}
              >
                {getEffectLabel(effect)}
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {getEffectDescription(effect, type)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 my-4 text-base text-gray-600 ">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-300 rounded-full"></div>
          <span>Weak</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
          <span>Resist</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <span>Immune</span>
        </div>
      </div>
    </div>
  );
};

export default TypeDefense;
