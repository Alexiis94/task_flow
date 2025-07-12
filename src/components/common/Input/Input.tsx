import styles from "./Input.module.css";

import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeHolder?: string;
  className?: string;
}

const Input = ({
  placeHolder = "Ingrese un titulo",
  className,
  ...rest
}: InputProps) => {
  return (
    <input
      type="text"
      className={`${styles.input} ${className}`}
      placeholder={placeHolder}
      {...rest}
    />
  );
};

export default Input;
