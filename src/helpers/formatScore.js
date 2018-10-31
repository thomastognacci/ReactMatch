export function formatScore(score) {
  let scoreString = score.toString();
  if (scoreString.length < 4) return score;
  if (scoreString.length < 7) {
    return `${scoreString.slice(0, -3)}\xa0${scoreString.slice(-3)}`;
  }
  if (scoreString.length < 10) {
    return `${scoreString.slice(-9, -6)}\xa0${scoreString.slice(-6, -3)}\xa0${scoreString.slice(
      -3,
    )}`;
  }
  return "cheater!";
}
