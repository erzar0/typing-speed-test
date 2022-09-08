import style from "./TypingStats.module.css";

const TypingStats = ({ typingStats }) => {
  if (!typingStats) {
    return (
      <div className={style.StatsContainer}>
        You must first complete the test!
      </div>
    );
  }
  console.log(typingStats);
  return (
    <div className={style.StatsContainer}>
      <h3>Avg time of typing character:</h3>
      {Object.entries(typingStats.avgTypingTimes)
        .sort()
        .map((entry) => {
          const char = entry[0];
          const time = entry[1];
          return (
            <div key={char}>
              <span>{`${char}:`.padEnd(7, "\xa0")}</span>
              <span>{`${time} ms`} </span>
            </div>
          );
        })}
    </div>
  );
};

export default TypingStats;
