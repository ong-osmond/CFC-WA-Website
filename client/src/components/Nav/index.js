import React from "react";

function Nav() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" id="homeLink" href="/">
        Search
      </a>
     <ul className="navbar-nav">
     <li className="nav-item">
       <a className="nav-link navbar-brand" id="savedLink" href="/bookshelf">Saved</a>
     </li>
   </ul>
    </nav>
    </div>
  );
}

export default Nav;