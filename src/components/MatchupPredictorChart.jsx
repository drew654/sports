"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const MatchupPredictorChart = ({ teamA, teamB }) => {
  const data = [
    { name: teamA.name, value: teamA.probability },
    { name: teamB.name, value: teamB.probability },
  ];

  const COLORS = [teamA.color, teamB.color];

  return (
    <div className="relative w-100% h-64">
      <div className="absolute right-0 bottom-0 text-xl font-bold">
        {teamA.probability}%
      </div>
      <div className="absolute left-0 top-0 text-xl font-bold">
        {teamB.probability}%
      </div>

      <div className="absolute inset-0 flex items-center justify-center gap-6">
        <img src={teamB.logo} alt={teamB.name} className="w-10 h-10" />
        <div className="w-px h-12 bg-gray-400"></div>
        <img src={teamA.logo} alt={teamA.name} className="w-10 h-10" />
      </div>

      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius="70%"
            outerRadius="90%"
            startAngle={90}
            endAngle={-270}
            paddingAngle={2}
            dataKey="value"
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MatchupPredictorChart;
