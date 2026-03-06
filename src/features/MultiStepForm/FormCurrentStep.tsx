import { JSX } from "react";
import { Step1, Step2, Step3 } from "./AllSteps";

const FormCurrentStep = ({
  currentStep,
}: {
  currentStep: number;
}): JSX.Element | null => {
  switch (currentStep) {
    case 1:
      return <Step1 />;
    case 2:
      return <Step2 />;
    case 3:
      return <Step3 />;
    default:
      return null;
  }
};

export default FormCurrentStep;
