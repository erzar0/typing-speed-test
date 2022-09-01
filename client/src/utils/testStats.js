function generateTypingStats(text) {
  if (!text) return null;

  let stats = {};
  stats.typingTimes = getTypingTimes(text);
  stats.avgTypingTimes = getAvgTypingTimes(stats.typingTimes);
  stats.totalTime = getTotalTime(stats.typingTimes);
  stats.accuracy = getAccuracy(text);
  stats.overallWpm = getOverallWpm(text, stats);
  stats.accurateWpm = stats.overallWpm * stats.accuracy;
  return stats;
}

function getTypingTimes(text) {
  let typingTimes = {};
  for (let letter of text) {
    const t = letter.typingTime;
    const char = letter.char;
    typingTimes[char] = typingTimes[char] ? [...typingTimes[char], t] : [t];
  }
  return typingTimes;
}

function getAvgTypingTimes(typingTimes) {
  let avgTypingTimes = {};
  Object.entries(typingTimes)
    .sort()
    .forEach((entry) => {
      const char = entry[0];
      const timesArray = entry[1];
      const avgTime = Math.round(
        timesArray.reduce((acc, curr) => acc + curr, 0) / timesArray.length
      );
      avgTypingTimes[char] = avgTime;
    });
  return avgTypingTimes;
}

function getTotalTime(typingTimes) {
  return Object.values(typingTimes)
    .flatMap((typingTime) => typingTime)
    .reduce((prev, curr) => prev + curr, 0);
}

function getAccuracy(text) {
  return (
    text.filter((letter) => letter.status === "correct").length / text.length
  );
}

function getOverallWpm(text, stats) {
  const totalTimeInMins = stats.totalTime / 1000 / 60;
  const charsPerMinute = text.length / totalTimeInMins;
  return charsPerMinute / 5;
}
export { generateTypingStats };
