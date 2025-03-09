

export default function Progress({ qNo, numQuestions, points, totalPoints }) {
  return (
    <>
        <progress id="progress-bar" max={numQuestions} value={qNo}></progress>
        <div className="progress">
            <p>
        Question: <strong>{qNo + 1}</strong>/{numQuestions}
      </p>
      <p>
        Points: <strong>{points}</strong>/{totalPoints}
      </p>
    </div>
    </>
  );
}

