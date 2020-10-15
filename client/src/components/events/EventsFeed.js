import React, { Component, useState } from "react";
import { Media, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";
import DefaultImage from "./img/2020-Called-To-Holiness.jpg";
import Navbar from "../layout/Navbar"
import Moment from 'moment';
import EventForm from "./EventForm";
//import "../../css/style.css";
import { upload_preset } from "./cloudinary";

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
                alert("Thank you for joining this event!");
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
                alert("You have backed out of this event.");
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
                    {/* <div class="header-overlay">
                        This is the overlay
                      </div> */}
                </header>


                <section id="display">
                    <div className="container">
                        {this.props.auth.isAuthenticated && (this.props.auth.user.memberType == 'member' ||
                            this.props.auth.user.memberType == 'admin') &&
                            <Button color="success" onClick={() => { this.toggle() }}>Add an Event</Button>
                        }
                        <hr></hr>

                        <h1>Upcoming events</h1>

                        <hr></hr>

                        {this.state.events.map(result => (
                            <div key={result._id}>
                                <div className="eventfeedimg">
                                    <h1>{Moment(result.eventDate).format('ddd DD MMM yyyy')}
                                    </h1>
                                    <p>{Moment(result.eventDate).format('hh:mm A')}    </p>
                                    <hr width="80%" align="center"></hr>
                                    {result.eventVenue &&
                                        <p>{result.eventVenue}</p>
                                    }

                                </div>

                                <div className="eventfeedmain">
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
                                                    <p>To join this event, please <Link to="/login">log In</Link> with your verified and approved CFC WA Account.</p>
                                            :
                                            <p></p>
                                    }
                                    <p>Current number of participants: {result.eventParticipants.length}</p>
                                    <hr></hr>
                                </div>

                                <div className="eventfeedphoto">
                                    <img src={result.eventImageURL} />
                                </div>


                                {/* <div>
                                    <a><img src={result.eventImageURL} /></a>
                                </div> */}

                            </div>

                        ))}

                    </div></section>


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
