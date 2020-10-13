import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import NavbarImage from "../../images/CFC2020.jpg";
import "../../css/style.css";


class Navbar extends Component {

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-warning fixed-top">
        <a className="nav-bar brand" id="branding">
          <h1 className="d-none d-sm-block"><span className="highlight"> Couples for Christ </span > WA</h1>
          <h1 className="d-block d-sm-none"><span className="highlight"> CFC </span > WA
            </h1>
          <span className="custom-toggler">
            <button className="navbar-toggler mr-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </span>
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li>
              <Link
                to="/"
              >
                Home
            </Link>
            </li>
            <li>
              <Link
                to="/events"
              >
                Events
            </Link>
            </li>
            {this.props.auth.isAuthenticated &&
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            }
            {this.props.auth.isAuthenticated ?
              <li>
                <Link
                  onClick={this.onLogoutClick}
                >
                  Log Out
            </Link>
              </li>
              :
              <li>
                <Link
                  to="/login"
                >
                  Log In
            </Link>
              </li>
            }
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
