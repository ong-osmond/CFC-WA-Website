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

        <section id="login">
          <div className="register-box">

            <h4>Register</h4>

            <form noValidate onSubmit={this.onSubmit}>
              <div className="registerfield">
                <input
                  onChange={this.onChange}
                  value={this.state.emailAddress}
                  error={errors.emailAddress}
                  id="emailAddress"
                  type="emailAddress"
                  placeholder="Email Address"
                  className={classnames("", {
                    invalid: errors.emailAddress,
                  })}
                />
                <span>{errors.emailAddress}</span>
              </div>

              <div className="registerfield">
                <input
                  onChange={this.onChange}
                  value={this.state.firstName}
                  error={errors.firstName}
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                />
              </div>

              <div className="registerfield">
                <input
                  onChange={this.onChange}
                  value={this.state.lastName}
                  error={errors.lastName}
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                />
              </div>

              <div className="registerfield">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  placeholder="Password"
                  className={classnames("", {
                    invalid: errors.password,
                  })}
                />
                <span>{errors.password}</span>
              </div>

              <div className="registerfield">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  placeholder="Confirm Password"
                  className={classnames("", {
                    invalid: errors.password2,
                  })}
                />
                <span>{errors.password2}</span>
              </div>

              <button
                style={{
                  width: "150px",
                  borderRadius: "23px",
                  borderColor: "#e8ca1d",
                  borderWidth: "3px",
                  letterSpacing: "1.5px",
                  color: "#ffffff",
                  marginTop: "1rem"
                }}
                type="submit"
                className="customBtn"
              >
                Sign up
                </button>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </form>



          </div>

        </section>

        <footer>
          <p>Osmond Ong Web Design, Copyright &copy; 2020</p>
        </footer>

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
