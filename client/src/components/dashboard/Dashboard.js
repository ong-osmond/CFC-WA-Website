import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar"
import Moment from 'moment';
import DefaultImage from "../../images/oong.jpg";



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
        <header>
          <Navbar />
        </header>
      
      <div class="dashboard">
      <div class="sidebar">
        <div class="sidebar-menu">
          <center class="profile">
            <img src={DefaultImage}></img>
              <p>Osmond</p>
          </center>
          
          <li class="item">
            <a href="#" class="menu-btn">
              <i class="fas fa-desktop"></i><span>Dashboard</span>
            </a>
          </li>
          <li class="item" id="profile">
            <a href="#profile" class="menu-btn">
              <i class="fas fa-users"></i><span>Members<i class="fas fa-chevron-down drop-down"></i></span>
            </a>
            <div class="sub-menu">
              <a href="#"><i class="fas fa-image"></i><span>Pending Approval</span></a>
              <a href="#"><i class="fas fa-address-card"></i><span>All Members</span></a>
            </div>
          </li>
          <li class="item" id="messages">
            <a href="#messages" class="menu-btn">
              <i class="fas fa-calendar-week"></i><span>Events<i class="fas fa-chevron-down drop-down"></i></span>
            </a>
            <div class="sub-menu">
              <a href="#"><i class="fas fa-envelope"></i><span>Pending Approval</span></a>
              <a href="#"><i class="fas fa-envelope-square"></i><span>Approved</span></a>
              <a href="#"><i class="fas fa-exclamation-circle"></i><span>Rejected</span></a>
            </div>
          </li>
          <li class="item" id="settings">
            <a href="#settings" class="menu-btn">
              <i class="fas fa-newspaper"></i><span>Announcements<i class="fas fa-chevron-down drop-down"></i></span>
            </a>
            <div class="sub-menu">
              <a href="#"><i class="fas fa-lock"></i><span>Pending Approval</span></a>
              <a href="#"><i class="fas fa-language"></i><span>Archived</span></a>
            </div>
          </li>
         
        </div>
      </div>

      

      </div>

      <div class="dash-main-container">
        <p>Welcome, Osmond!</p>
      </div>

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
