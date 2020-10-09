import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";
import DefaultImage from "./img/2020-Called-To-Holiness.jpg";
import Navbar from "../layout/Navbar"
import "../../css/style.css";


class EventForm extends Component {

    createEventHandler = () => {
        console.log(this);
        // API.createEvent(this).then((res) => {
        //     this.loadEvents()
        // })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }


    render() {
        const { user } = this.props.auth;
        return (
            <body>
                <header>
                    <Navbar />
                </header>
                <Form>
                    <FormGroup>
                        <Label for="eventTitle">Event Title</Label>
                        <Input type="textarea" name="text" id="eventTitle" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="eventDescription">Event Description</Label>
                        <Input type="textarea" name="text" id="eventDescription" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="eventType">Select an Event Type</Label>
                        <Input type="select" name="select" id="eventType">
                            <option>Chapter Assembly</option>
                            <option>Teaching</option>
                            <option>Prayer Meeting</option>
                            <option>Fellowship</option>
                        </Input>
                    </FormGroup>
                    {this.props.auth.isAuthenticated &&
                        <Button color="success" onClick={() => this.createEventHandler()}>Create Event</Button>
                    }
                </Form>
            </body>
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
