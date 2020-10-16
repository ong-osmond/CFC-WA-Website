import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
//import "../../css/style.css";

class Landing extends Component {
  render() {
    return (
      <body>
        <header>
          <Navbar />
        </header>
        <section id="blueline"></section>
        <section id="showcase">
          <div className="container">
            <h5>Families in the Holy Spirit, renewing the face of the earth</h5>
          </div>
        </section>

        <section id="newsletter">
          <div className="container">
            <h5>Subscribe to our newsletter</h5>
            <form>
              <input type="email" placeholder="Enter email"/>
              <button type="submit" className="button_1">Subscribe</button>
            </form>
          </div>
        </section>

        <footer>
          <p>Osmond Ong Web Design, Copyright &copy; 2020</p>
        </footer>
      
      </body>
    );
  }
}
export default Landing;