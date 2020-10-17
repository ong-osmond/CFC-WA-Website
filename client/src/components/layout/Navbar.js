import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import "../../css/style.css";



class Navbar extends Component {

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-warning fixed-top">

        {/* {this.props.auth.isAuthenticated && this.props.auth.user.memberType.includes("admin") &&
          <label for="check">
            <i className="fas fa-bars" id="sidebar_btn"></i>
          </label>
        } */}




        <a className="nav-bar brand">
          <h1 className="d-none d-sm-block"><b><span style={{ color: "#415a84" }}>Couples for Christ</span></b><span style={{ color: "#ffffff" }}> WA</span ></h1>
          <h1 className="d-block d-sm-none"><b><span style={{ color: "#415a84" }}>CFC</span></b><span style={{ color: "#ffffff" }}> WA</span >
          </h1>
        </a>
        <span className="custom-toggler">
          <button className="navbar-toggler mr-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </span>
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
            <li>
              <Link
                to="/posts"
              >
                News
            </Link>
            </li>
            {this.props.auth.isAuthenticated &&
              <li>
                  <Link to="/dashboard">Dashboard</Link>
              </li>
            }
            {this.props.auth.isAuthenticated &&
              <li>
                <Link to="/profile">Profile</Link>
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
