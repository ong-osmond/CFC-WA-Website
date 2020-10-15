import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatetimePicker from 'react-datetime';
import Moment from 'moment';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";
import "react-datetime/css/react-datetime.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Moment.locale('en');

class EventForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
            eventTitle: '',
            eventDescription: '',
            eventType: '',
            eventDate: '',
            creator_id: this.props.auth.user.id,
            eventImageURL: ''

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
        this.setState({ eventDate: date })
    }

    // Save the event using the Create Event API
    callCreateEventAPI = () => {
        let request = {
            eventTitle: this.state.eventTitle,
            eventDescription: this.state.eventDescription,
            eventType: this.state.eventType,
            eventDate: this.state.eventDate,
            eventVenue: this.state.eventVenue,
            creator_id: this.state.creator_id,
            eventImageURL: this.state.eventImageURL
        };
        API.createEvent(request).then((res) => {
            toast.success('Thank you for submitting an event. The Administrator will review the event before it is published.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.props.toggleModal();
            this.setState({
                eventTitle: '',
                eventDescription: '',
                eventType: '',
                eventDate: '',
                eventVenue: '',
                creator_id: '',
                eventImageURL: ''
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    createEventHandler = () => {
        if (this.state.eventTitle == ''
            || this.state.eventDescription == ''
            || this.state.eventType == ''
            || this.state.eventVenue == '') {
            toast.error('You have not completed all required fields.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            // Find the image uploaded
            const { files } = document.querySelector('input[type="file"]');
            if (files.length > 0) {
                const formData = new FormData();
                formData.append('file', files[0]);
                formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
                const options = {
                    method: 'POST',
                    body: formData,
                };
                return fetch(`https://api.Cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, options)
                    .then(res => res.json())
                    .then(res => {
                        this.state.eventImageURL = (res.secure_url);
                        this.callCreateEventAPI();
                    }) // Set the eventImageURL returned by Cloudinary
                    .catch(err => console.log(err));
            } else {
                this.callCreateEventAPI();
            }
        }
    }

    render() {
        const { user } = this.props.auth;
        return (
            <Form>

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

                <FormGroup>
                    <Label for="eventTitle">Event Title</Label>
                    <Input type="textarea" id="eventTitle" onChange={this.handleInputChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="eventDescription">Description</Label>
                    <Input type="textarea" id="eventDescription" onChange={this.handleInputChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="eventDate">Date</Label>
                    <br></br>
                    <DatetimePicker
                        id="eventDate"
                        onChange={this.handleDateTimeChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="eventVenue">Venue or Online Meeting Link (e.g. Zoom URL)</Label>
                    <Input type="textarea" id="eventVenue" onChange={this.handleInputChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="eventType">Select an Event Type</Label>
                    <Input type="select" id="eventType" onChange={this.handleInputChange} required>
                        <option default></option>
                        <option>Chapter Assembly</option>
                        <option>Christian Life Program</option>
                        <option>Fellowship</option>
                        <option>Prayer Meeting</option>
                        <option>Teaching</option>
                        <option>Other</option>
                    </Input>
                </FormGroup>

                <div className="form-group">
                    <Label>Upload a photo</Label>
                    <p><input type="file" /></p>
                </div>

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
