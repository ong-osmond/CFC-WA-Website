import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar"

import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      emailAddress: "",
      firstName: "",
      lastName: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      emailAddress: this.state.emailAddress,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <body>
        <header>
          <Navbar />
        </header>

        <div className="login-box">
          <div className="container">
            <div className="row">
              <div className="col s12 offset-s2">

                <div className="col s12" style={{ paddingLeft: "11.250px" }}>

                  <p className="grey-text text-darken-1">
                    Already have an account? <Link to="/login">Log in</Link>
                  </p>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.emailAddress}
                      error={errors.emailAddress}
                      id="emailAddress"
                      type="emailAddress"
                      className={classnames("", {
                        invalid: errors.emailAddress,
                      })}
                    />
                    <label htmlFor="emailAddress">Email Address</label>
                    <span className="red-text">{errors.emailAddress}</span>
                  </div>

                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.firstName}
                      error={errors.firstName}
                      id="firstName"
                      type="text"
                    />
                    <label htmlFor="name">First Name</label>
                  </div>

                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.lastName}
                      error={errors.lastName}
                      id="lastName"
                      type="text"
                    />
                    <label htmlFor="name">Last Name</label>
                  </div>

                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password}
                      id="password"
                      type="password"
                      className={classnames("", {
                        invalid: errors.password,
                      })}
                    />
                    <label htmlFor="password">Password</label>
                    <span className="red-text">{errors.password}</span>
                  </div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.password2}
                      error={errors.password2}
                      id="password2"
                      type="password"
                      className={classnames("", {
                        invalid: errors.password2,
                      })}
                    />
                    <label htmlFor="password2">Confirm Password</label>
                    <span className="red-text">{errors.password2}</span>
                  </div>
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                      }}
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                      Sign up
                </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
