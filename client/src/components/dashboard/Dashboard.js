import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar"
import Moment from 'moment';
import Sidebar from "../dashboard/Sidebar";

class Dashboard extends Component {

  constructor(props) {

    super(props);

    this.state = {
      displayModal: false,
    };
  }

  toggle = () => {
    let toggledValue = !this.state.displayModal;
    this.setState({
      displayModal: toggledValue,
    });
  };

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

              {/* <section id="display">
                <div className="dash-main-container">
                <h1>Greetingsss in Christ, {user.firstName}!</h1>
            </div>

            <div className="dashboard-home">
                  <article id="recent-updates">
                      <h1>Latesttt Updates</h1>
                      <hr></hr>
                      <p>hello</p>
                  </article>
                                                
                  <aside id="latest-news">
                      <h1>Latest News</h1>
                      <hr></hr>
                      <p>hello</p>
                  </aside>
              </div> 

              </section> */}

            </div>
          }

          <section id="dash_home_display">
            <div className="container">
              <h1>Greetings in Christ, {user.firstName}!</h1>
            </div>

            <div className="dashboard-home">
                  <article id="recent-updates">
                      <h1>Latest Updates</h1>
                      <hr></hr>
                      <p>You have (0) news.</p>
                  </article>
                                                
                  <aside id="latest-news">
                      <h1>Latest News</h1>
                      <hr></hr>
                      <p>You have (0) new updates</p>
                  </aside>
              </div>

          </section>

                
           
        </div>

        {/* <iframe
          src="https://universalis.com/readings.htm"
          name="universalis"
          width="100%"
          height="100%"
          scrolling="auto"
          align="bottom"
          frameborder="3">
          <a href="http://universalis.com">Please visit the
   Universalis web site</a>
        </iframe> */}


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
