function generateTypingStats(text) {
  if (!text) return null;

  let stats = {};
  stats.typingTimePerLetter = getTypingTimePerLetter(text);
  stats.averageTypingTimePerLetter = calcAverageTypingTimePerLetter(
    stats.typingTimePerLetter
  );
  stats.totalTypingTime = calcTotalTypingTime(stats.typingTimePerLetter);
  stats.accuracy = calcAccuracy(text);
  stats.rawWpm = calcRawWpm(text, stats);
  stats.accurateWpm = stats.rawWpm * stats.accuracy;
  return stats;
}

function getTypingTimePerLetter(text) {
  return text.map((l) => {
    return { time: l.typingTime, character: l.char };
  });
}

function calcAverageTypingTimePerLetter(typingTimePerLetter) {
  let result = {};
  typingTimePerLetter.forEach((entry) => {
    result[entry.character] = result[entry.character]
      ? [...result[entry.character], entry.time]
      : [entry.time];
  });
  const sum = (arr) => arr.reduce((sum, entry) => sum + entry, 0);
  return Object.entries(result).map(([character, times]) => {
    return { [character]: sum(times) / times.length };
  });
}

function calcTotalTypingTime(typingTimePerLetter) {
  return typingTimePerLetter.reduce((sum, letter) => sum + letter.time, 0);
}

function calcAccuracy(text) {
  return (
    text.filter(({ status }) => status === "correct" || status === "corrected")
      .length / text.length
  );
}

function calcRawWpm(text, stats) {
  const totalTimeInMins = stats.totalTime / 1000 / 60;
  const charsPerMinute = text.length / totalTimeInMins;
  return charsPerMinute / 5;
}

function calcTemporaryWpm(time, amountOfLetters = 1) {
  const timeInMins = time / 1000 / 60;
  const charsPerMinute = amountOfLetters / timeInMins;
  return charsPerMinute / 5;
}
export { generateTypingStats, calcTemporaryWpm };
