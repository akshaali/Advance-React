import { useState } from "react";
import { useEvent } from "../CustomHooks/useEvent";
const CompA = () => {
  const [clickCount, setClickCount] = useState(0);
  const { emitEvent } = useEvent();

  const handleEmitEventA = () => {
    console.log("eventA emitterr")
    setClickCount(clickCount + 1);
    emitEvent("eventA", {
      count: clickCount + 1,
      timeStamp: new Date().getTime(),
    });
  };

  return (
    <div>
      <h3>Event emitting component</h3>
      <p>Hi, I am component A</p>
      <button onClick={handleEmitEventA}>
        Click me to trigger eventA listerner
      </button>
      <p>Count value of component A : {clickCount}</p>
    </div>
  );
};

export default CompA;
