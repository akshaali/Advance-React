import React, { useState } from 'react';
import { flushSync } from "react-dom";

function Rerender() {
  const [count, setCount] = useState(1);

  console.log("render", count);

  const handleClick = () => {
    flushSync(() => {
      setCount(prevCount => prevCount + 1);
      
    });
    flushSync(() => {
      setCount(prevCount => prevCount + 1);
    });
  }

  return (
    <button onClick={handleClick}>
      Click
    </button>
  );
}

export default Rerender;