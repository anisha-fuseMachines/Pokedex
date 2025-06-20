import React, { useState, useEffect } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
} from "recharts";
import type { PokemonDetail } from "../../types/pokemonList";

interface BasicDetailsProps {
  pokemonDetail: PokemonDetail;
}

const AbilityStat = ({ pokemonDetail }: BasicDetailsProps) => {
  const [chartSize, setChartSize] = useState({ width: 400, height: 400 });

  useEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      if (width < 480) {
        setChartSize({ width: 250, height: 250 });
      } else if (width < 768) {
        setChartSize({ width: 350, height: 350 });
      } else {
        setChartSize({ width: 400, height: 400 });
      }
    }

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const statData = pokemonDetail.stats.map((stat) => ({
    stat: stat.stat.name
      .replace("special-attack", "Sp. Atk")
      .replace("special-defense", "Sp. Def")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    value: stat.base_stat,
  }));

  return (
    <div className="text-white bg-linear-(--custom-gradient) py-6 px-8 rounded-lg  flex items-center flex-col">
      <h2 className="mb-2 text-left font-medium w-full text-lg">Stats</h2>
      <RadarChart
        cx={chartSize.width / 2}
        cy={chartSize.height / 2}
        outerRadius={chartSize.width / 2 - 20}
        width={chartSize.width}
        height={chartSize.height}
        data={statData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="stat" />
        <PolarRadiusAxis angle={30} domain={[0, 250]} />
        <Radar
          name="Stats"
          dataKey="value"
          stroke="#8979FF"
          fill="#8979FF"
          fillOpacity={0.6}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#222",
            border: "none",
            color: "#fff",
          }}
          formatter={(value: number) => [`${value}`]}
        />
      </RadarChart>
    </div>
  );
};

export default AbilityStat;
