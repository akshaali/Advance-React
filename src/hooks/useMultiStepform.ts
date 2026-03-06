import { useReducer } from "react";
import { initialValue, FormDataType } from "../context/multiStepForm";
import {
  validateEmail,
  validateName,
  validatePhoneNumber,
} from "../utils/FormValidityUtils";

const updateFormReducer = (state: FormDataType, action: any) => {
  switch (action.type) {
    case "UPDATE_FORM_DATA":
      return {
        ...state,
        [action.field]: { value: action.value, isError: false },
      };
    case "STEP1_SUBMIT_FORM":
      const { name, email, phoneNumber } = state;
      const isNameValid = validateName(name.value);
      const isEmailValid = validateEmail(email.value);
      const isPhoneNumberValid = validatePhoneNumber(phoneNumber.value);
      const nextStep =
        isNameValid && isEmailValid && isPhoneNumberValid
          ? state.currentStep + 1
          : state.currentStep;
      return {
        ...state,
        name: { ...name, isError: !isNameValid },
        email: { ...email, isError: !isEmailValid },
        phoneNumber: {
          ...phoneNumber,
          isError: !isPhoneNumberValid,
        },
        currentStep: nextStep,
      };
    case "PREV_STEP":
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    default:
      return state;
  }
};

export const useMultiStepForm = () => {
  const [formData, setFormData] = useReducer(updateFormReducer, initialValue);

  return { formData, setFormData };
};
