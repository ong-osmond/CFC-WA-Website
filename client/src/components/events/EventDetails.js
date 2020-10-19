import React, { Component, useState } from "react";
import { Button, Table } from 'reactstrap';
// import { Table, thead, Tbody, tr, th, td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Moment from 'moment';

class EventDetails extends Component {
    render() {
        return (
            <body>
                <a href="javascript:if(window.print)window.print()"><i className="fas fa-print"></i></a>
                {this.props.eventDetails.map(result => (
                    <div>
                        <div>
                            <h1> {result.eventTitle} </h1>
                            <p> {Moment(result.eventDate).format('DD MMM yyyy hh:mm A')} </p>
                            <p> {result.eventVenue} </p>
                            <p> {result.eventDescription} </p>
                        </div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Email Address</th>
                                    <th>Present</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.eventParticipant_details
                                    .sort((a, b) => a.lastName > b.lastName ? 1 : -1)
                                    .map(participant =>
                                        (
                                            <tr key={participant.lastName}>
                                                <td>
                                                    {participant.lastName}
                                                </td>
                                                <td>
                                                    {participant.firstName}
                                                </td>
                                                <td>
                                                    {participant.emailAddress}
                                                </td>
                                                <td>
                                                    <input type="checkbox" id="checkedIn" value="false"></input>
                                                </td>
                                            </tr>
                                        )

                                    )

                                }
                            </tbody>
                        </Table>

                    </div>
                )
                )
                }
            </body>
        )
    }
}

EventDetails.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(EventDetails);
