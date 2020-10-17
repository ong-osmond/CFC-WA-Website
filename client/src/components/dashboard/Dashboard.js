import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar"
import Moment from 'moment';
import Sidebar from "../dashboard/Sidebar";

class Dashboard extends Component {

  componentDidMount() {
    let currentDate = Moment.now();

  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <body>
        <input type="checkbox" id="check" />
        <header>
          <Navbar />
        </header>

        <div className='dashboardSections'>

          {this.props.auth.isAuthenticated && user.memberType.includes("admin") &&
            <div className='dashboardSections'>
              <Sidebar />
            </div>
          }

        <h1>Greetings in Christ, {user.firstName}!</h1>
          
        </div>

        <iframe
            src="https://universalis.com/readings.htm"
            name="universalis"
            width="100%"
            height="100%"
            scrolling="auto"
            align="bottom"
            frameborder="3">
            <a href="http://universalis.com">Please visit the
   Universalis web site</a>.
 </iframe>

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
