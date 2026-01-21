import React from "react";

function Button({
  text,
  onClick,
  css = "",
  type = "button",
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${css}
      `}
    >
      {text}
    </button>
  );
}

export default Button;
