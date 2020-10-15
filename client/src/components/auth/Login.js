import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Navbar from "../layout/Navbar"
//import "../../css/style.css"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      emailAddress: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      emailAddress: this.state.emailAddress,
      password: this.state.password
    };
    this.props.loginUser(userData) // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  render() {
    const { errors } = this.state;
    return (
      <body>
        <header>
          <Navbar />
        </header>

        <section id="login">
          <div className="login-box">
            <h4>
              <b>Login</b>
            </h4>


            <form noValidate onSubmit={this.onSubmit}>
              <div className="textbox">
                <i className="fa fa-user" aria-hidden="true"></i>
                <input
                  onChange={this.onChange}
                  value={this.state.emailAddress}
                  error={errors.emailAddress}
                  id="emailAddress"
                  type="emailAddress"
                  placeholder="Email Address"
                  className={classnames("", {
                    invalid: errors.emailAddress || errors.emailnotfound || errors.emailAddressNotfound
                  })}
                />

                <span className="red-text">
                  {errors.emailAddress}
                  {errors.emailnotfound}
                  {errors.emailAddressNotfound}
                </span>

              </div>

              <div className="textbox">
                <i className="fa fa-lock" aria-hidden="true"></i>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  placeholder="Password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordIncorrect
                  })}
                />
                <span className="red-text">
                  {errors.password}
                  {errors.passwordIncorrect}
                </span>

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
                className="customBtn">
                <b>Login</b>
              </button>


              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
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
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);