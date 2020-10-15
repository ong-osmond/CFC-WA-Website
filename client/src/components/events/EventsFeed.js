import React, { Component, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";
import Navbar from "../layout/Navbar"
import Moment from 'moment';
import EventForm from "./EventForm";
//import "../../css/style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Moment.locale('en');

class EventsFeed extends Component {

    constructor(props) {

        super(props);

        this.state = {
            events: [],
            displayModal: false
        };
    }

    toggle = () => {
        let toggledValue = !this.state.displayModal;
        this.setState({
            displayModal: toggledValue
        });
    };


    componentDidMount() {
        this.loadEvents();
    }

    loadEvents = () => {
        API.getEvents()
            .then((res) => {
                this.setState({ events: res.data })
            })
            .catch(err => console.log(err));
    };

    joinHandler = (id) => {
        let request = {
            id: id,
            participant_id: this.props.auth.user.id
        }
        API.joinEvent(request)
            .then(() => {
                toast.success('Thank you for joining this event.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.loadEvents()
            })
            .catch((err) => {
                console.log(err);
            });
    }

    unjoinHandler = (id) => {
        let request = {
            id: id,
            participant_id: this.props.auth.user.id
        }
        API.unjoinEvent(request)
            .then(() => {
                toast.warn('You have backed out of this event.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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

            <body>
                <header>
                    <Navbar />
                </header>

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <section id="display">
                    {/* <div className="container"> */}

                    <hr></hr>
                    <Table className="eventsTable">

                        <Tr className="eventsTr">
                            <Td className="eventsTd">
                                <h1>Upcoming events</h1>
                                <hr></hr>
                            </Td>
                            <Td className="eventsTd">
                                {this.props.auth.isAuthenticated && (this.props.auth.user.memberType == 'member' ||
                                    this.props.auth.user.memberType == 'admin') &&
                                    <Button color="success" onClick={() => { this.toggle() }} className="addEventBtn">Add an Event</Button>
                                }
                            </Td>
                        </Tr>

                        {this.state.events.map(result => (
                            <Tr className="eventsTr" key={result._id}>
                                    <Td className="eventfeedimg eventsTd">
                                        <h1>{Moment(result.eventDate).format('ddd DD MMM yyyy')}
                                        </h1>
                                        <p>{Moment(result.eventDate).format('hh:mm A')}    </p>
                                        <hr width="80%" align="center"></hr>
                                        {result.eventVenue &&
                                            <p>{result.eventVenue}</p>
                                        }
                                    </Td>
                                    <Td className="eventfeedmain eventsTd">
                                        <p><span className="highlight">{result.eventTitle} </span></p>
                                        <p>Details: {result.eventDescription}</p>
                                        <p>Type of Event: {result.eventType}</p>
                                        {
                                            (result.eventParticipants) ?
                                                result.eventParticipants.includes(user.id) ?
                                                    <p><button type="submit" className="buttonRed" onClick={() => this.unjoinHandler(result._id)}>Back out of event</button></p> :
                                                    this.props.auth.isAuthenticated && (this.props.auth.user.memberType == 'member' ||
                                                        this.props.auth.user.memberType == 'admin') ?
                                                        <p><button type="submit" className="buttonGreen" onClick={() => this.joinHandler(result._id)}>Join</button></p> :
                                                        <p>To join this event, please <Link to="/login">log in</Link> with your approved CFC WA Account.</p>
                                                :
                                                <p></p>
                                        }
                                        <p>Current number of participants: {result.eventParticipants.length}</p>
                                        <hr></hr>
                                    </Td>
                                    <Td className="eventfeedphoto eventsTd">
                                        {result.eventImageURL &&
                                            <img src={result.eventImageURL} />
                                        }
                                    </Td>
                            </Tr>
                        ))}                       
                    </Table>
                </section>


                <Modal isOpen={this.state.displayModal} >
                    <ModalHeader >Add an Event</ModalHeader>
                    <ModalBody>
                        <EventForm toggleModal={this.toggle} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => { this.toggle() }}>Cancel</Button>
                    </ModalFooter>
                </Modal>


            </body>
        );
    }
}
EventsFeed.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(EventsFeed);
