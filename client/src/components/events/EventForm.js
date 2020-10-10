import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import DatetimePicker from 'react-datetime';
import Moment from 'moment';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";
import DefaultImage from "./img/2020-Called-To-Holiness.jpg";
import "../../css/style.css";
import "react-datetime/css/react-datetime.css";

Moment.locale('en');

class EventForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
            eventTitle: '',
            eventDescription: '',
            eventType: '',
            eventDate: Moment.now(),
            creator_id: this.props.auth.user.id

        };
    }


    handleInputChange = (event) => {
        event.preventDefault();
        const { id, value } = event.target;
        this.setState({ ...this.state, [id]: value });
    }


    handleDateTimeChange = this.handleDateTimeChange.bind(this)

    // Receives the selected "moment" object as only parameter
    handleDateTimeChange(date) {
        // date ? date = date.format('DD/MMM/yyyy hh:mm') : date = '';
        this.setState({ eventDate: date })
    }

    createEventHandler = () => {
        let request = {
            eventTitle:  this.state.eventTitle ,
            eventDescription:  this.state.eventDescription ,
            eventType:  this.state.eventType ,
            eventDate:  this.state.eventDate,
            eventVenue: this.state.eventVenue,
            creator_id:  this.state.creator_id 
        }
        API.createEvent(request).then((res) => {
            alert("Thank you for submitting an event. The Administrator will review the event before it is published.")
        })
            .catch((err) => {
                console.log(err);
            });

    }


    render() {
        const { user } = this.props.auth;
        return (

            <Form>
                <FormGroup>
                    <Label for="eventTitle">Event Title</Label>
                    <Input type="textarea" id="eventTitle" onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="eventDescription">Description</Label>
                    <Input type="textarea" id="eventDescription" onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="eventDate">Date</Label>
                    <br></br>
                    <DatetimePicker
                        id="eventDate"
                        onChange={this.handleDateTimeChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="eventVenue">Venue</Label>
                    <Input type="textarea" id="eventVenue" onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="eventType">Select an Event Type</Label>
                    <Input type="select" id="eventType" onChange={this.handleInputChange}>
                        <option default></option>
                        <option>Chapter Assembly</option>
                        <option>Teaching</option>
                        <option>Prayer Meeting</option>
                        <option>Fellowship</option>
                    </Input>
                </FormGroup>
                {this.props.auth.isAuthenticated &&
                    <Button color="success"

                        onClick={this.createEventHandler}>Create Event</Button>
                }
            </Form>

        );
    }
}


EventForm.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(EventForm);
