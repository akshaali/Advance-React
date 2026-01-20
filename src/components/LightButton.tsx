import { JSX } from "react";

interface LightButtonProps {
  color: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const LightButton = ({
  color,
  isActive,
  onClick,
}: LightButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        ...(isActive ? style.active : style.inactive),
      }}
    />
  );
};

const style = {
  active: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    border: "none",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    margin: 20,
  },
  inactive: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    border: "none",
    boxShadow: "none",
    margin: 10,
  },
};
