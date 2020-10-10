import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar"
import Moment from 'moment';


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

        <section id="display">
          <div className="container">
            <h4>Greetings in Christ, {user.firstName} {user.lastName}!</h4>
            {/* <h6>Current date and time: {this.currentDate.format('ddd DD MMM yyyy hh:mm A')}</h6> */}
            <hr></hr>

            <section id="main">
              <div class="container">
                <article id="main-col">
                  <h1 class="page-title"> Welcome to your Couples for Christ dashboard. </h1>
                </article>

                <aside id="sidebar">
                  <div class="dark">
                    <h3>
                      <p>{user.memberType == "admin" &&
                        <Link
                          to="/admin/approve-member"
                        >
                          Approve Members
                        </Link>
                      }</p>

                      <p>{user.memberType == "admin" &&
                        <Link
                          to="/admin/approve-member"
                        >
                          Approve Events
                        </Link>
                      }</p>

                      <p>{user.memberType == "admin" &&
                        <Link
                          to="/admin/approve-member"
                        >
                          Approve Stories
                        </Link>
                      }</p>

                    </h3>
                  </div>
                </aside>

              </div>
            </section>



          </div>
        </section>
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
