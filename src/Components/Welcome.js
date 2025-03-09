import "./WelcomeStyle.css";

export default function Welcome({ startQuiz, noOfQns=0 }) {
  return (
    <div className="welcome">
      <h1>Welcome to the React Quiz</h1>
      <h3>{noOfQns} questions to test your React Mastry</h3>
      <button onClick={startQuiz}>Let's Start!</button>
    </div>
  );
}
