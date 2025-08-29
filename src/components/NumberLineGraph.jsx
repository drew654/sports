import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const NumberLineGraph = ({ numbers }) => {
  const data = numbers.map((value, index) => ({ index, value }));

  return (
    <div className="w-full h-48 border rounded">
      <ResponsiveContainer>
        <LineChart data={data} className="pointer-events-none">
          <XAxis dataKey="index" hide />
          <YAxis hide domain={[0, 1]} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#588ae3"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <ReferenceLine y={0.5} strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NumberLineGraph;
