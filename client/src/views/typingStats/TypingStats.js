import style from "./TypingStats.module.css";
import { calcTemporaryWpm } from "../../utils/testStats";
import WpmChart from "./WpmChart";

const TypingStats = ({ typingStats }) => {
  if (!typingStats) {
    return (
      <div className={style.StatsContainer}>
        You must first complete the test!
      </div>
    );
  }

  const step = Math.min(typingStats.typingTimePerLetter.length / 2, 20);
  const chartData = calcDataForChart(typingStats.typingTimePerLetter, step);
  return (
    <div className={style.StatsContainer}>
      <h1 style={{ color: "limegreen", margin: 0 }}>
        wpm: {typingStats.accurateWpm.toFixed(1)}
      </h1>
      <h4 style={{ color: "orange", margin: 0 }}>
        raw wpm: {typingStats.rawWpm.toFixed(1)}
      </h4>
      <h4 style={{ margin: 0 }}>
        accuracy: {typingStats.accuracy.toFixed(1) * 100}%
      </h4>
      <WpmChart chartData={chartData} />
    </div>
  );
};

//Calculates average typing time of n adjecent letters (moving average)
function calcDataForChart(typingTimePerLetter, letterCount) {
  let result = [{ temporaryAvgWpm: 0, letterCount: 0 }];
  let sumOfTimes = 0;
  for (let i = 0; i < typingTimePerLetter.length; i++) {
    sumOfTimes += typingTimePerLetter[i].time;
    if ((i + 1) % letterCount === 0) {
      result.push({
        temporaryAvgWpm: calcTemporaryWpm(sumOfTimes, letterCount),
        letterCount: i + 1,
      });
      sumOfTimes = 0;
    }
  }
  return result;
}
export default TypingStats;
