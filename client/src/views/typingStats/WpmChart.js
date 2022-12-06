import style from "./TypingStats.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const WpmChart = ({ chartData }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 0, bottom: 20, left: 5, right: 5 }}
          marg
        >
          <defs>
            <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc23c" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#ffc23c" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="temporaryAvgWpm"
            fillOpacity={1}
            fill="url(#gradientColor)"
            stroke="#ffc23c"
          />
          <CartesianGrid strokeDasharray="5 5" opacity={0.6} vertical={false} />
          <XAxis
            dataKey="letterCount"
            axisLine={false}
            tickLine={false}
            label={{
              value: "No. Characters",
              position: "bottom",
              fill: "#ffc23c",
            }}
            color="green"
          />
          <YAxis
            dataKey="temporaryAvgWpm"
            axisLine={false}
            tickLine={false}
            label={{
              value: "WPM",
              angle: -90,
              position: "insideLeft",
              fill: "#ffc23c",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className={style.CustomTooltip}>
        <h4>{label}</h4>
        <p>{payload[0].payload.temporaryAvgWpm.toFixed(0)}wpm</p>
      </div>
    );
  }
  return null;
}
export default WpmChart;
