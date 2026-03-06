import { ActionDispatch, createContext } from "react";

export interface MultiStepFormContextType {
  formdata: FormDataType;
  setFormData: ActionDispatch<[action: any]>;
}

export interface FormDataType {
  name: {
    value: string;
    isError: boolean;
  };
  email: {
    value: string;
    isError: boolean;
  };
  phoneNumber: {
    value: string;
    isError: boolean;
  };
  interests: {
    value: string[];
    isError: boolean;
  };
  currentStep: number;
}

export const initialValue: FormDataType = {
  name: {
    value: "",
    isError: false,
  },
  email: {
    value: "",
    isError: false,
  },
  phoneNumber: {
    value: "",
    isError: false,
  },
  interests: {
    value: [],
    isError: false,
  },
  currentStep: 1,
};

export const MultiStepFormContext = createContext<MultiStepFormContextType>({
  formdata: initialValue,
  setFormData: () => initialValue,
});
