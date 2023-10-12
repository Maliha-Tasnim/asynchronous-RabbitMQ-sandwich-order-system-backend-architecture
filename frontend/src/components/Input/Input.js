import React from "react";
import styles from "./Input.module.css";

export const Input = ({ form, name, required, ...props }) => {
    return (
        <label className={styles.Input}>
            <span>{name}{required && "*"}:</span>
            <input name={name} required={required} value={form && form[name]} {...props} />
        </label>
    );
};
