import styles from "./Input.module.css";

import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeHolder?: string;
}

const Input = ({ placeHolder = "Ingrese un titulo", ...rest }: InputProps) => {
  return (
    <input
      type="text"
      className={styles.input}
      placeholder={placeHolder}
      {...rest}
    />
  );
};

export default Input;
