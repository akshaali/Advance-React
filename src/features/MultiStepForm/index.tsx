import { JSX } from "react";
import Stepper from "../../components/Stepper";
import FormCurrentStep from "./FormCurrentStep";
import { MultiStepFormContext } from "../../context/multiStepForm";
import { useMultiStepForm } from "../../hooks/useMultiStepform";

const MultiStepForm = (): JSX.Element => {
  const { formData, setFormData } = useMultiStepForm();
  return (
    <MultiStepFormContext.Provider value={{ formdata: formData, setFormData }}>
      <div>
        <h2>Multi step form </h2>
        <Stepper totalSteps={3} currentStep={formData.currentStep} />
        <FormCurrentStep currentStep={formData.currentStep} />
      </div>
    </MultiStepFormContext.Provider>
  );
};

export default MultiStepForm;
