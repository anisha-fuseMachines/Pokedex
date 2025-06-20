import type { PokemonDetail } from "../../types/pokemonList";

interface BasicDetailsProps {
  pokemonDetail: PokemonDetail;
}

const BasicDetails = ({ pokemonDetail }: BasicDetailsProps) => {
  return (
    <div className="bg-linear-(--custom-gradient) w-full h-auto flex items-center justify-center p-4 mt-4 rounded-lg col-span-2">
      <div className="grid grid-cols-2 md:grid-cols-3 w-full max-w-4xl gap-4">
        <div className=" p-4 flex flex-col items-center justify-center flex-wrap">
          <p className="text-sm text-secondary">Weight</p>

          <p className="text-white ml-2 text-md ">
            {pokemonDetail.weight / 10} kg
          </p>
        </div>
        <div className=" p-4 flex flex-col items-center justify-start flex-wrap border-l-1 border-secondary">
          <p className="text-sm text-secondary">Height</p>

          <p className="text-white ml-2 text-md ">
            {pokemonDetail.height / 10} m
          </p>
        </div>{" "}
        <div className=" p-4 flex flex-col items-center justify-start flex-wrap md:border-l-1 border-secondary">
          <p className="text-sm text-secondary">Egg Group</p>

          <p className="text-white ml-2 text-md capitalize">
            {pokemonDetail?.egg_groups.map((group) => group.name).join(", ")}
          </p>
        </div>{" "}
        <div className=" p-4 flex flex-col items-center justify-start flex-wrap border-l-1 border-secondary md:border-secondary md:border-l-0 ">
          <p className="text-sm text-secondary">Base Exp</p>

          <p className="text-white ml-2 text-md ">
            {pokemonDetail.base_experience}
          </p>
        </div>{" "}
        <div className=" p-4 flex flex-col items-center justify-start flex-wrap md:border-l-1 border-secondary">
          <p className="text-sm text-secondary">Base Hp</p>

          <p className="text-white ml-2 text-md ">
            {pokemonDetail.base_happiness}
          </p>
        </div>{" "}
        <div className=" p-4 flex flex-col items-center justify-start flex-wrap border-l-1 border-secondary">
          <p className="text-sm text-secondary">Capture Rate</p>

          <p className="text-white ml-2 text-md ">
            {pokemonDetail.capture_rate}
          </p>
        </div>{" "}
        <div className=" p-4 flex flex-col items-center justify-start flex-wrap">
          <p className="text-sm text-secondary">Growth Rate</p>

          <p className="text-white ml-2 text-md capitalize">
            {pokemonDetail.growth_rate?.name.replace(/-/g, " ")}
          </p>
        </div>
        <div className=" p-4 flex flex-col items-center justify-start flex-wrap border-l-1 border-secondary">
          <p className="text-sm text-secondary">Abilities</p>

          <p className="text-white ml-2 text-md flex flex-wrap item-start justify-self-start">
            {pokemonDetail.abilities.map((ability, index) => (
              <span key={ability.ability.name} className="mr-2 capitalize">
                {ability.ability.name}
                {index < pokemonDetail.abilities.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
