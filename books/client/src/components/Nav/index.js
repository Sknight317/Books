import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <ul>
        <li><a href> Google Books</a></li>
        <li><a href="/">Search</a></li>
        <li><a href="/api/books">Saved</a></li>
      </ul>
    </nav>
  );
}

export default Nav;
