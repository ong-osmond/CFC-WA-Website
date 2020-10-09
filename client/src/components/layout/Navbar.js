import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "../../css/style.css";


class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div class="container">
        <div id="branding">
          <h1><span class="highlight"> Couples for Christ </span> WA</h1>
        </div>
        <nav>
          <li class="current">
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
             <Link to="dashboard">Dashboard</Link>
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
        </nav>
      </div>
    );
  }
}
//export default Navbar;

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
