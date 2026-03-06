import { useContext } from "react";
import { MultiStepFormContext } from "../../../context/multiStepForm";

const Step1 = () => {
  const { formdata, setFormData } = useContext(MultiStepFormContext);
  console.log("formdata in step 1", formdata);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ type: "UPDATE_FORM_DATA", field: name, value });
  };

  const handleNextClick = () => {
    setFormData({ type: "STEP1_SUBMIT_FORM" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3>Step 1</h3>
      <label>name</label>
      <input
        name="name"
        value={formdata.name.value}
        onChange={handleOnChange}
      />
      {formdata.name.isError && (
        <span style={{ color: "red" }}>Please enter a valid name</span>
      )}
      <label> email </label>
      <input
        name="email"
        value={formdata.email.value}
        onChange={handleOnChange}
      />
      {formdata.email.isError && (
        <span style={{ color: "red" }}>Please enter a valid email</span>
      )}
      <label> phone number </label>
      <input
        name="phoneNumber"
        value={formdata.phoneNumber.value}
        onChange={handleOnChange}
      />
      {formdata.phoneNumber.isError && (
        <span style={{ color: "red" }}>Please enter a valid phone number</span>
      )}
      <button onClick={handleNextClick}>next</button>
    </div>
  );
};

export default Step1;
