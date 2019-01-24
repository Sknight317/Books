import React from "react";
import "./style.css";
// Destructuring the type, className, children and onClick props, applying them to the button element
function ViewBtn({ type = "default", className, children, onClick }) {
  return (
    <button  className={["btn btn-lg", `btn-${type}`, className].join(" ")}>
      {children}
    </button>
  );
}

export default ViewBtn;
