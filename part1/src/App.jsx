import { useState } from "react";


const Button = ({handleButtonclick, text}) => {
  return (
    <button onClick={handleButtonclick}>{text}</button>
  );
}

// conditional rendering
// the behaviour of the component now depends
// on whether any buttons have been clicked
const ButtonClicksHistory = ({allClicks}) => {
  
    if (allClicks.length > 0){
      return (
        <p>Button press history: {allClicks.join(",")}</p>
      )
    }
  return (
    <p>Start by clicking the buttons</p>
  )
}

const TotalButtonClicks = ({total}) => {
  return (
    <p>Total clicks: {total}</p>
  )
}

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAllClicks] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClicks = () => {
    // [functional update]. a recommended way to update the state.
    // incase of multiple simultaneous state updates
    setLeft((left) => left + 1);
    setAllClicks(allClicks => allClicks.concat("L"));
    setTotal((total) => total + 1);
  };

  const handleRightClicks = () => {
    const newRight = right + 1; // less recommended coz it requires a new var
    setRight(newRight);
    const click = allClicks.concat("R");
    setAllClicks(click);
    setTotal((total) => total + 1);
  };

  return (
    <div>
      {left}
      <Button handleButtonclick={handleLeftClicks} text="Left" />
      <Button handleButtonclick={handleRightClicks} text="Right" />
      {right}
      <br />
      <ButtonClicksHistory allClicks={allClicks} />
      <TotalButtonClicks total={total} />
    </div>
  );
};

export default App;
