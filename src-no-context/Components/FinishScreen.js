export default function FinishScreen({
  points,
  maxPossiblePoints,
  highscore,
  dispatch,
  setQuizOpen,
}) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🎖️";
  if (percentage >= 80 && percentage < 100) emoji = "🥳";
  if (percentage >= 50 && percentage < 80) emoji = "😬";
  if (percentage > 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <div className="final-score">
      {" "}
      <h3>
        {emoji} You scored <strong>{points}</strong> points out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </h3>
      <p>Highscore : {highscore}</p>
      <button
        onClick={() => {
          dispatch({ type: "restart" });
          setQuizOpen(false)}}
      >
        Restart Quiz
      </button>
    </div>
  );
}
