import React, { Component, useState } from "react";
import { Media, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";
import DefaultImage from "./img/2020-Called-To-Holiness.jpg";
import Navbar from "../layout/Navbar"
import "../../css/style.css";


const imgStyle = {
    maxWidth: "64px",
};

class EventsFeed extends Component {

    state = {
        events: []
    };

    componentDidMount() {
        this.loadEvents();
    }

    loadEvents = () => {
        API.getEvents()
            .then((res) => {
                console.log(res.data);
                this.setState({ events: res.data })
            })
            .catch(err => console.log(err));
    };


    joinHandler = (id) => {
        API.joinEvent(id).then((res) => {
            this.loadEvents()
        })
            .catch((err) => {
                console.log(err);
            });
    }


    unjoinEventHandler = (id) => {
        console.log(id);
        API.unjoinEvent(id).then((res) => {
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

                <section id="display">
                    <div>
                        <h1>List of Events:</h1>
                        <hr></hr>
                        {this.state.events.map(result => (
                            <Media>

                                <Media left top href="#">
                                    <Media style={imgStyle} object src={DefaultImage} alt="Generic placeholder image" />
                                </Media>

                                <Media body>
                                    <Media heading>
                                        {result.eventTitle}
                                    </Media>
                                    <p>{result.eventDescription} </p> 
                                    <p>When: {result.eventDate} </p>
                                    <p>Event Type: {result.eventType} </p> 
                                    <Media>
                                        {this.props.auth.isAuthenticated &&
                                            <Button color="success" onClick={() => this.joinHandler(result._id)}>Join</Button>
                                        }
                                        {this.props.auth.isAuthenticated &&
                                            <Button color="danger" onClick={() => this.unjoinHandler(result._id)}>Unjoin</Button>
                                        }
                                    </Media>
                                </Media>


                            </Media>

                        ))}
                    </div></section></body>
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
