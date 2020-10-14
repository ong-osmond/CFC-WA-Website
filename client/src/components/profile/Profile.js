import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar"
import Moment from 'moment';
import API from "../../utils/API";
import DefaultImage from "../../images/oong.jpg";
import Sidebar from "../dashboard/Sidebar";
import DatePicker from 'react-datetime-picker';

Moment.locale('en');


class Profile extends Component {

    componentDidMount() {
        this.loadMemberInfo();
    }


    loadMemberInfo = () => {
        API.getMemberInfo("5f7dc53caaf881359cfca7cb")
            .then((res) => {
                console.log(res);
                //this.setState({ events: res.data })
            })
            .catch(err => console.log(err));
    };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
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
    this.setState({ eventDate: date })
}

createEventHandler = () => {
    let request = {
        eventTitle: this.state.eventTitle,
        eventDescription: this.state.eventDescription,
        eventType: this.state.eventType,
        eventDate: this.state.eventDate,
        eventVenue: this.state.eventVenue,
        creator_id: this.state.creator_id
    }
    API.createEvent(request).then((res) => {
        alert("Thank you for submitting an event. The Administrator will review the event before it is published.");
        this.props.toggleModal();
        this.setState({
            eventTitle: '',
            eventDescription: '',
            eventType: ''
        });
    })
        .catch((err) => {
            console.log(err);
        });

}

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
        <h1>MY INFO</h1>
        
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
                <DatePicker
                    id="eventDate"
                    onChange={this.handleDateTimeChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="eventVenue">Venue or Online (Zoom) Link</Label>
                <Input type="textarea" id="eventVenue" onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="eventType">Select an Event Type</Label>
                <Input type="select" id="eventType" onChange={this.handleInputChange}>
                    <option default></option>
                    <option>Chapter Assembly</option>
                    <option>Christian Life Program</option>
                    <option>Fellowship</option>
                    <option>Prayer Meeting</option>
                    <option>Teaching</option>
                    <option>Other</option>
                </Input>
            </FormGroup>
            {this.props.auth.isAuthenticated &&
                <Button color="success"

                    onClick={this.createEventHandler}>Update Profile</Button>
            }
        </Form>

        </div>
        </section>

        </body>
    )
}
}

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Profile);
