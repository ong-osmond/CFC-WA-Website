import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Moment from 'moment';
import DefaultImage from "../../images/oong.jpg";


class Sidebar extends Component {
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
            <div className="sidebar">
                <div className="sidebar-menu">
                    <center className="profile">
                        <img src={DefaultImage}></img>
                        <p>{user.firstName}</p>
                    </center>
                    <li className="item">
                        <a href="#" className="menu-btn">
                            <i className="fas fa-desktop"></i><span>Dashboard</span>
                        </a>
                    </li>
                    {this.props.auth.isAuthenticated && this.props.auth.user.memberType == 'admin' &&
                        <li className="item" id="profile">
                            <a href="#profile" className="menu-btn">
                                <i className="fas fa-users"></i><span>Members<i className="fas fa-chevron-down drop-down"></i></span>
                            </a>
                            <div className="sub-menu">
                                <a href="/admin/members/manage"><i className="fas fa-image"></i><span>Manage Members</span></a>
                            </div>
                        </li>
                    }
                    {this.props.auth.isAuthenticated && this.props.auth.user.memberType == 'admin' &&
                    <li className="item" id="messages">
                        <a href="#messages" className="menu-btn">
                            <i className="fas fa-calendar-week"></i><span>Events<i className="fas fa-chevron-down drop-down"></i></span>
                        </a>
                        <div className="sub-menu">
                            <a href="/admin/events/manage"><i className="fas fa-envelope"></i><span>Manage Events</span></a>
                        </div>
                    </li>
                    }
                    {this.props.auth.isAuthenticated && this.props.auth.user.memberType == 'admin' &&
                    <li className="item" id="messages">
                        <a href="#messages" className="menu-btn">
                            <i className="fas fa-calendar-week"></i><span>Events<i className="fas fa-chevron-down drop-down"></i></span>
                        </a>
                        <div className="sub-menu">
                            <a href="/admin/events/manage"><i className="fas fa-envelope"></i><span>Manage Announcements</span></a>
                        </div>
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