import React, { Component, useState } from "react";
import { Button } from 'reactstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
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
              <h1>Manage Events</h1>
              <br></br>

              <Table hover>
                <Thead>
                  <Tr>
                    <Th>Event Creation Date</Th>
                    <Th>Created by</Th>
                    <Th>Event Title</Th>
                    <Th>Date</Th>
                    <Th>Description</Th>
                    <Th>Venue</Th>
                    <Th>Participants</Th>
                    <Th>Approve / Unapprove</Th>
                    <Th>Remove Event</Th>
                  </Tr>
                </Thead>
                <Tbody>

                  {this.state.events.map(result => (
                    <Tr key={result._id}>
                      <Td>{Moment(result.creationDate).format('ddd DD MMM yyyy')}</Td>
                      <Td>{result.creator_details[0].firstName} {result.creator_details[0].lastName}</Td>
                      <Td>{result.eventTitle}</Td>
                      <Td>{Moment(result.eventDate).format('ddd DD MMM yyyy hh:mm A')}</Td>
                      <Td>{result.eventDescription}</Td>
                      <Td>{result.eventVenue}</Td>
                      <Td>{result.eventParticipants.length}</Td>
                      <Td>
                        {user.memberType == 'admin' && !result.eventApproved &&
                          <Button color="success" onClick={() => this.approveEventHandler(result._id)}>Approve</Button>
                        }
                        {user.memberType == 'admin' && result.eventApproved &&
                          <Button color="danger" onClick={() => this.unapproveEventHandler(result._id)}>Un-approve</Button>
                        }

                      </Td>
                      {
                        result.memberType != 'admin' &&
                      <Td><Button color="danger" onClick={() => this.removeEventHandler(result._id)}>Remove</Button> </Td>
                      }
                    </Tr>
                  ))}

                </Tbody>

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
