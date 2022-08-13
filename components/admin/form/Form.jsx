import React from "react";

export default function Form({ children, label, error_message }) {
  let form_header_class = error_message ? "form__header form__header--error" : "form__header";
  return (
    <div className="form">
      <header className={form_header_class}>
        {error_message ? error_message : label}
      </header>
      <div className="form__body">{children}</div>
    </div>
  );
}
