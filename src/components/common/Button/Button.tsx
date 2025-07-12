import style from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary" | "cancel"; // <- agrega variante
}

const Button = ({
  children,
  onClick,
  variant = "primary",
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${style.button} ${style[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;
