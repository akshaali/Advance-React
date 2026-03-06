import { useContext } from "react";
import { MultiStepFormContext } from "../../../context/multiStepForm";

const Step2 = () => {
  const { formdata, setFormData } = useContext(MultiStepFormContext);
  const handleNextClick = () => {
    // setFormData({ type: "STEP1_SUBMIT_FORM" });
  };
  const handlePrevClick = () => {
    // setFormData({ type: "STEP1_SUBMIT_FORM" });
    setFormData({ type: "PREV_STEP" });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3>Step 2</h3>
      <label>name</label>
      <input />
      <label> email </label>
      <input />
      <label> phone number </label>
      <input />
      <button onClick={handlePrevClick}>prev</button>
      <button onClick={handleNextClick}>next</button>
    </div>
  );
};

export default Step2;
