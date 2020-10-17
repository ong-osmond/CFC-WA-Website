import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import DefaultImage from "../../images/defaultFamilyImage.jpg";


class Sidebar extends Component {

    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div className="sidebar" >
                <div className="sidebar-menu">
                <label for="check">
                    <i class="far fa-window-close" id="sidebar_btn"></i>
                </label>
                    <center className="profile">
                        <img src={DefaultImage}></img>
                        <p>{user.firstName}</p>
                    </center>
                    <li className="item">
                        <a href="/dashboard" className="menu-btn">
                            <i className="fas fa-desktop"></i><span>Dashboard</span>
                        </a>
                    </li>
                    {/* <li className="item">
                        <a href="#profile" className="menu-btn">
                            <i className="fas fa-user"></i><span>Profile</span>
                        </a>
                    </li> */}
                    {this.props.auth.isAuthenticated && this.props.auth.user.memberType.includes('admin') &&
                        <li className="item" id="profile">
                            <a href="/admin/members/manage" className="menu-btn">
                                <i className="fas fa-users"></i><span>Members
                                    {/* <i className="fas fa-chevron-down drop-down"></i> */}
                                </span>
                            </a>
                            {/* <div className="sub-menu">
                                <a href="/admin/members/manage"><i className="fas fa-image"></i><span>Manage Members</span></a>
                            </div> */}
                        </li>
                    }
                    {this.props.auth.isAuthenticated && this.props.auth.user.memberType.includes('admin') &&
                        <li className="item" id="messages">
                            <a href="/admin/events/manage" className="menu-btn">
                                <i className="far fa-calendar-alt"></i><span>Events
                                    {/* <i className="fas fa-chevron-down drop-down"></i> */}
                                    </span>
                            </a>
                            {/* <div className="sub-menu">
                                <a href="/admin/events/manage"><i className="far fa-calendar-alt"></i><span>Manage Events</span></a>
                            </div> */}
                        </li>
                    }
                    {this.props.auth.isAuthenticated && this.props.auth.user.memberType.includes('admin') &&
                        <li className="item" id="messages">
                            <a href="/admin/events/manage" className="menu-btn">
                                <i className="far fa-newspaper"></i><span>News
                                    {/* <i className="fas fa-chevron-down drop-down"></i> */}
                                    </span>
                            </a>
                            {/* <div className="sub-menu">
                                <a href="/admin/events/manage"><i className="fas fa-envelope"></i><span>Manage Announcements</span></a>
                            </div> */}
                        </li>
                    }

                </div>
            </div>

        )
    }

}
Sidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Sidebar);