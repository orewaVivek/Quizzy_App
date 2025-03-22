import { createContext, useEffect, useReducer, useState } from "react";

const QuizContext = createContext();

function QuizProvider({ children }) {
  const SECS_PER_QUESTION = 30;
  const initialState = {
    questions: [],
    // status can be - loading, error , ready , active , finished.
    status: "loading",
    answer: null,
    points: 0,
    currentIndex: 0,
    highscore: 0,
    secondsRemaining: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "fetchedData":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFetchFailed":
        return { ...state, status: "error" };
      case "startQuiz":
        return {
          ...state,
          status: "active",
          secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        };
      case "newAnswer":
        const currentQuestion = state.questions[state.currentIndex]; // Get current question
        const isCorrect = action.payload === currentQuestion.correctOption;
        return {
          ...state,
          answer: action.payload,
          points: isCorrect
            ? state.points + currentQuestion.points
            : state.points,
        };
      case "resetAnswer":
        return { ...state, answer: null };
      case "nextQuestion":
        return {
          ...state,
          currentIndex: state.currentIndex + 1, // Move to next question
          answer: null, // Reset answer for the next question
        };
      case "finished":
        return {
          ...state,
          status: "finished",
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      case "restart":
        return {
          ...initialState, // Reset everything to initial state
          status: "ready", // Ensure quiz is ready again
          questions: state.questions, // Keep the questions
        };
      case "tick":
        return {
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status,
        };
      default:
        throw new Error("action is unknown");
    }
  }

  const [quizOpen, setQuizOpen] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSetQuestionNo() {
    if (state.currentIndex < state.questions.length - 1) {
      dispatch({ type: "resetAnswer" });
      dispatch({ type: "nextQuestion" }); // Move to the next question
    } else {
      dispatch({ type: "finished" });
    }
  }

  function handleQuizOpen() {
    if (state.questions.length > 0) {
      setQuizOpen(true);
      dispatch({ type: "startQuiz" });
    } else {
      console.log("Questions are not loaded yet!");
    }
  }

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const data = await res.json();
        dispatch({ type: "fetchedData", payload: data });
      } catch (err) {
        dispatch({ type: "dataFetchFailed" });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        state,
        quizOpen,
        handleQuizOpen,
        handleSetQuestionNo,
        dispatch,
        setQuizOpen,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizProvider, QuizContext };
