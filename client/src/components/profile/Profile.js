import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import Moment from "moment";
import API from "../../utils/API";
import DatePicker from "react-datetime-picker";

Moment.locale("en");


class Profile extends Component {
    state = { memberInfo: [] }
  
    loadMemberInfo = () => {
        API.getMemberInfo(this.props.auth.user.id)
          .then((res) => {
            this.setState({ memberInfo: res });
          })
          .catch((err) => console.log(err));
      };
  
      componentDidMount() {
        this.loadMemberInfo();
      }
  
    render() { return <Profile data={this.state.memberInfo} /> }
  }

export function Profile (props) {
    // props.data will update when your parent calls setState
    // you can also call DataWrapper here if you need MyComponent specific wrapper
    console.log(props);
    return (
      <div></div>
    )
  }


