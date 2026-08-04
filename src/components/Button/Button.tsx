import styles from "./Button.module.css";

interface ButtonProps {
  buttonText: string;
  buttonType: "submit" | "button";
  handleButton: () => void;
}

const Button = ({ buttonText, buttonType, handleButton }: ButtonProps) => {
  return (
    <button
      className={styles.button}
      type={buttonType}
      onClick={handleButton}
    >
      {buttonText}
    </button>
  );
};

export default Button;
