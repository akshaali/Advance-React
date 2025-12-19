import { useEffect, useState } from "react";
import { useEvent } from "../CustomHooks/useEvent";

const CompB = () => {
  const [clickCount, setClickCount] = useState(0);
  const { addEventListener, removeEventListener } = useEvent();
  useEffect(() => {
    const handler = (data: any) => {
      console.log("Event A triggered", data);
      setClickCount(data.count);
    };
    addEventListener("eventA", handler);
    return () => {
      removeEventListener("eventA", handler);
    };
  }, [addEventListener, removeEventListener]);

  return (
    <div>
      <h3>Event Recieving component</h3>
      <p>Hi, I am component B</p>
      <div>Click count from Component A: {clickCount}</div>
    </div>
  );
};

export default CompB;
