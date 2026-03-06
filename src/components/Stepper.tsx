import { JSX } from "react";

interface StepperPropTypes {
  totalSteps: number;
  currentStep: number;
}

const Stepper = ({
  totalSteps,
  currentStep,
}: StepperPropTypes): JSX.Element => {
  const steps = Array(totalSteps).fill(0);
  return (
    <div
      style={{
        display: "flex",
        // flex: 1,
        flexDirection: "row",
        backgroundColor: "grey",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {steps.map((item, index) => {
        return (
          <div
            style={{
            //   flex: 1,
              backgroundColor: index < currentStep ? "green" : "grey",
              padding: 10,
            }}
          >
            <div key={index}>{`Step-${index}`}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
