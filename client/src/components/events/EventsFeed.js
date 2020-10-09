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
                    <div class="container">
                        <h1>List of Events:</h1>
                        <hr></hr>

                        {this.state.events.map(result => (
                            <div>
                                <div class="eventfeedimg">
                                    <p>{result.eventDate}</p>
                                </div>

                                <div class="eventfeedmain">
                                    <p><span class="highlight">{result.eventTitle} </span></p>
                                    <p>{result.eventDescription}</p>
                                    <p>{result.eventType}</p>
                                   
                                    {this.props.auth.isAuthenticated &&
                                        <button type="submit" class="buttonGreen" color="red" onClick={() => this.joinHandler(result._id)}>Join</button>
                                    }
                                    {this.props.auth.isAuthenticated &&
                                        <button type="submit" class="buttonRed" color="green" onClick={() => this.unjoinHandler(result._id)}>Unjoin</button>
                                    }
                                    
                                    <hr maxWidth="50%"></hr>
                                    
                                </div>
                            </div>

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
