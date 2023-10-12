import styles from "./Button.module.css";

export const Button = ({ className, onClick, text, ...props }) => {
    return <button onClick={onClick} className={[styles.button, className].join(" ")} {...props}>{text}</button>;
};
