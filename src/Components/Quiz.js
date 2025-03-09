import "./QuizStyle.css";
import Progress from "./Progress";
import Timer from "./Timer";
export default function Quiz({
  question,
  options,
  setQuestionNo,
  qNo,
  dispatch,
  answer,
  points,
  totalPoints,
  totalQuestions,
  secondsRemaining
}) {
  const QPoints = question.points;

  // const handleNext =()=>{
  //     dispatch({type:"resetAnswer"});
  //     setQuestionNo();
  // }
  const handleNext = () => {
    dispatch({ type: "resetAnswer" });
    setQuestionNo();
  };
  const handleFinish = () => {
    dispatch({ type: "finished" });
    console.log("Quiz Finished!"); // Add any additional logic for finishing the quiz
  };


  return (
    <>
      <div className="questionaire">
        <Progress qNo={qNo}
          numQuestions={15}
          points={points}
          totalPoints={totalPoints}/>
        <h3>{question.question}</h3>
        {options.map((opt, i) => (
          <Option
            option={opt}
            key={opt}
            dispatch={dispatch}
            i={i}
            selectedAnswer={answer}
            answer={question.correctOption}
            points={QPoints}
          />
        ))}
        <div className="next">
          <Timer secondsRemaining={secondsRemaining} dispatch={dispatch}/>
          {answer !== null &&
            (qNo === totalQuestions -1 ? (
              <button onClick={handleFinish}>Finish</button> // Show Finish on last question
            ) : (
              <button onClick={handleNext}>Next</button> // Show Next otherwise
            ))}
        </div>
      </div>
    </>
  );
}

function Option({ option, dispatch, i, selectedAnswer, answer, points }) {
  return (
    <button
      className={`btns ${i === selectedAnswer ? "selectedAnswer" : ""} 
        ${selectedAnswer !== null ? (i === answer ? "correct" : "wrong") : ""}`}
      disabled={selectedAnswer !== null}
      onClick={() =>
        dispatch({
          type: "newAnswer",
          payload: i,
        })
      }
    >
      {option}
    </button>
  );
}
