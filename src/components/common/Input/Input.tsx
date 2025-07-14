import styles from "./Input.module.css";

import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeHolder?: string;
  className?: string;
  type?: string;
}

const Input = ({
  placeHolder = "Ingrese un titulo",
  className,
  type = "text",
  ...rest
}: InputProps) => {
  return (
    <input
      type={type}
      className={`${styles.input} ${className}`}
      placeholder={placeHolder}
      {...rest}
    />
  );
};

export default Input;
