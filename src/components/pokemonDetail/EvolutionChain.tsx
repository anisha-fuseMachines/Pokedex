import React from "react";
import TypeBadge from "../common/TypeBadge";

interface EvolutionStage {
  name: string;
  id: number;
  sprite: string;
  types: string[];
}

interface EvolutionNode {
  name: string;
  method?: string;
}

interface Props {
  evolutionStages: EvolutionStage[];
  evolutionPaths: EvolutionNode[][];
}

const EvolutionChain: React.FC<Props> = ({
  evolutionStages,
  evolutionPaths,
}) => {
  const getStageData = (name: string) =>
    evolutionStages.find((stage) => stage.name === name);

  return (
    <div className="bg-linear-(--custom-gradient) rounded-lg py-6 px-8">
      <h2 className="text-xl  font-medium mb-4 text-white ">Evolution Chain</h2>
      <div className="text-white mt-6 px-2 sm:px-0 flex justify-center flex-col items-center">
        {evolutionPaths.map((path, idx) => (
          <div
            key={idx}
            className={`flex flex-col sm:flex-row flex-wrap items-center justify-start md:justify-center mb-6 py-6 px-8 w-fit h-auto text-white ${
              evolutionPaths.length > 1 ? "border-b border-gray-50/10" : ""
            }`}
          >
            {path.map((node, index) => {
              const stage = getStageData(node.name);
              if (!stage) return null;

              return (
                <div
                  className="flex flex-col items-start space-x-2 md:flex-row "
                  key={stage.id}
                >
                  <div className="relative flex flex-col items-center md:flex-row gap-5  overflow-hidden rounded-xl">
                    <img
                      src={stage.sprite}
                      alt=""
                      aria-hidden="true"
                      className="absolute blur-[57px] z-0 overflow-hidden"
                    />

                    <div className="relative z-10 flex flex-col md:flex-row items-center rounded-xl shadow-lg w-fit md:w-full py-4 px-6 gap-4 ">
                      <img
                        src={stage.sprite}
                        alt={stage.name}
                        className="w-32 h-32 object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <span className="text-md text-gray-600">
                          #{stage.id.toString().padStart(3, "0")}
                        </span>
                        <span className="capitalize font-regular text-xl">
                          {stage.name}
                        </span>
                        <div className="flex gap-1 sm:gap-2 mt-1 sm:mt-2 flex-wrap justify-start">
                          {stage.types.map((type) => (
                            <TypeBadge key={type} type={type} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow + Method */}
                  {index < path.length - 1 && (
                    <div className="flex flex-row sm:flex-col items-center text-xs sm:text-sm text-gray-400 w-full sm:w-32 break-words text-center px-2 my-6">
                      <span className="sm:mb-1 break-words px-1 w-10 ">
                        {path[index + 1].method}
                      </span>
                      <img
                        src="/assets/Arrow.svg"
                        alt="Arrow"
                        className=" rotate-90 sm:rotate-0"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionChain;
