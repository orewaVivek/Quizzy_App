import "./App.css";
import Header from "./Components/Header";
import Welcome from "./Components/Welcome";
import Quiz from "./Components/Quiz";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import FinishScreen from "./Components/FinishScreen";
import { QuizProvider, QuizContext } from "./Context/QuizProvider";
import { useContext } from "react";

function QuizContent() {
  const { state, quizOpen, handleQuizOpen, handleSetQuestionNo, dispatch, setQuizOpen } =
    useContext(QuizContext);

  return (
    <div className="App">
      <Header />
      {state.status === "loading" && <Loader />}
      {state.status === "error" && <Error />}
      {state.status === "ready" && !quizOpen && state.questions.length > 0 ? (
        <Welcome startQuiz={handleQuizOpen} noOfQns={state.questions.length} />
      ) : null}

      {state.status === "active" && state.questions.length > 0 && (
        <Quiz
          question={state.questions[state.currentIndex]}
          options={state.questions[state.currentIndex].options}
          setQuestionNo={handleSetQuestionNo}
          qNo={state.currentIndex}
          dispatch={dispatch}
          answer={state.answer}
          points={state.points}
          totalPoints={state.questions.reduce((sum, q) => sum + q.points, 0)}
          totalQuestions={state.questions.length}
          secondsRemaining={state.secondsRemaining}
        />
      )}

      {state.status === "finished" && (
        <FinishScreen
          points={state.points}
          highscore={state.highscore}
          setQuizOpen={setQuizOpen}
          dispatch={dispatch}
          maxPossiblePoints={state.questions.reduce(
            (sum, q) => sum + q.points,
            0
          )}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  );
}

export default App;
