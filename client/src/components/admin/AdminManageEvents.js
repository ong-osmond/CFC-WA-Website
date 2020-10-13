import React, { Component, useState } from "react";
import { Table, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar"
import API from "../../utils/API";
import Moment from 'moment';


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
          <header>
            <Navbar />
          </header>

          <section id="display">
            <div>
              <h1>Pending Approvals:</h1>
              <br></br>

              <Table hover>
                <thead>
                  <tr>
                    <th>Event Creation Date</th>
                    <th>Created by</th>
                    <th>Event Title</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Venue</th>
                    <th>Current Number of Participants</th>
                    <th>Approve / Unapprove</th>
                    <th>Remove Event</th>
                  </tr>
                </thead>
                <tbody>

                  {this.state.events.map(result => (
                    <tr key={result._id}>
                      <td>{Moment(result.creationDate).format('ddd DD MMM yyyy')}</td>
                      <td>{result.creator_details[0].firstName} {result.creator_details[0].lastName}</td>
                      <td>{result.eventTitle}</td>
                      <td>{Moment(result.eventDate).format('ddd DD MMM yyyy hh:mm A')}</td>
                      <td>{result.eventDescription}</td>
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
                      <td><Button color="danger" onClick={() => this.removeEventHandler(result._id)}>Remove</Button> </td>
                      }
                    </tr>
                  ))}

                </tbody>

              </Table>
            </div></section>
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
