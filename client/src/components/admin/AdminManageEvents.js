import React, { Component, useState } from "react";
import { Button , Table } from 'reactstrap';
// import { Table, thead, Tbody, tr, th, td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar"
import API from "../../utils/API";
import Moment from 'moment';
import Sidebar from "../dashboard/Sidebar";


class AdminManageEvents extends Component {

  state = {
    events: []
  };

  componentDidMount() {
    this.loadEvents();
  }

  loadEvents = () => {
    API.manageEvents()
      .then((res) => {
        this.setState({ events: res.data })
      })
      .catch(err => console.log(err));
  };


  approveEventHandler = (id) => {
    API.approveEvent(id).then((res) => {
      //console.log(res);
      this.loadEvents()
    })
      .catch((err) => {
        console.log(err);
      });
  }


  unapproveEventHandler = (id) => {
    API.unapproveEvent(id).then((res) => {
      this.loadEvents()
    })
      .catch((err) => {
        console.log(err);
      });
  }

  removeEventHandler = (id) => {
    API.removeEvent(id).then((res) => {
      this.loadEvents()
    })
      .catch((err) => {
        console.log(err);
      });
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      this.props.auth.isAuthenticated && user.memberType.includes("admin") ?

        <body>
          <input type="checkbox" id="check"/>
          <header>
            <Navbar />
          </header>

          <div className='dashboardSections'>

            <Sidebar />

            <section id="display">
              <div className="dash-main-container">
                <h1>Manage Events</h1>
                <br></br>

                <Table hover>
                  <thead>
                    <tr>
                      <th>Creation Date</th>
                      <th>Created by</th>
                      <th>Event Title</th>
                      <th>Event Date</th>
                      <th>Description</th>
                      <th>Venue</th>
                      <th>Participants</th>
                      <th>Action</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>

                    {this.state.events.map(result => (
                      <tr key={result._id}>
                        <td>{Moment(result.creationDate).format('DD MMM yyyy hh:mm A')}</td>
                        <td>{result.creator_details[0].firstName} {result.creator_details[0].lastName}</td>
                        <td>{result.eventTitle}</td>
                        <td>{Moment(result.eventDate).format('ddd DD MMM yyyy hh:mm A')}</td>
                        <td>{result.eventDescription} 
                        { result.eventImageURL &&
                        <a href={result.eventImageURL} target="_blank"><i className="fas fa-image"></i></a>
                        }
                        </td>
                        <td>{result.eventVenue}</td>
                        <td>{result.eventParticipants.length}</td>
                        <td>
                          {user.memberType == 'admin' && !result.eventApproved &&
                            <Button color="success" onClick={() => this.approveEventHandler(result._id)}>Approve</Button>
                          }
                          {user.memberType == 'admin' && result.eventApproved &&
                            <Button color="danger" onClick={() => this.unapproveEventHandler(result._id)}>Un-approve</Button>
                          }

                        </td>
                        {
                          result.memberType != 'admin' &&
                          <td><Button color="danger" onClick={() => this.removeEventHandler(result._id)}>X</Button> </td>
                        }
                      </tr>
                    ))}

                  </tbody>

                </Table>
              </div>
              </section>

          </div>
        </body>

        :
        <h1>You are not authorised to view this page.</h1>
    );
  }
}
AdminManageEvents.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(AdminManageEvents);
