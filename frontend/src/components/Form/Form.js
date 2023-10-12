import React from "react";

// Just a wrapper for "form" because the default event.preventDefault is needed
export const Form = ({ children, onSubmit, ...props }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(event);
    };

    return (
        <form onSubmit={handleSubmit} {...props}>
            {children}
        </form>
    );
};
