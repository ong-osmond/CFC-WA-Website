import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar"

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <body>
        <header>
          <Navbar />
        </header>
        <h1>Greetings in Christ, {user.firstName} {user.lastName}! Welcome to your Couples for Christ dashboard. </h1>
        { user.memberType == "admin" &&
          <Link
            to="/admin/approve-member"
          >
            <h2>Approve Members</h2>
          </Link>
        }
      </body>

    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
