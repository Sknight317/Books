import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
  return (
    <button onClick={props.Submitbook} className="delete-btn" {...props} tabIndex="0">
      Save
    </button>
  );
}

export default SaveBtn;

