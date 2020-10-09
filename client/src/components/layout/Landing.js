import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

class Landing extends Component {
  render() {
    return (
      <body>
        <header>
          <Navbar />
        </header>
        <h1>Landing Page</h1>
      
      </body>
    );
  }
}
export default Landing;