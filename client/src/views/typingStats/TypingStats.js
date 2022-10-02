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

  const chartData = calcDataForChart(typingStats.typingTimePerLetter, 5);

  return (
    <div className={style.StatsContainer}>
      <WpmChart chartData={chartData} />
    </div>
  );
};

//Calculates average typing time of n adjecent letters
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
