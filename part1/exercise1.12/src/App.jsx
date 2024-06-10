import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood((good) => good + 1);
  };

  const handleBad = () => {
    setBad((bad) => bad + 1);
  };

  const handleNeutral = () => {
    setNeutral((neutral) => neutral + 1);
  };

  return (
    <div>
      <h3>Give feedback</h3>
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleBad} text="Bad" />
      <Button handleClick={handleNeutral} text="Neutral" />

      <h4>Statistics</h4>
      <p>Total good: {good}</p>
      <p>Total bad: {bad}</p>
      <p>Total neutral: {neutral}</p>
    </div>
  );
};

export default App;
