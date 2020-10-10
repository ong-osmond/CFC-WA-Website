import React, { Component, useState } from "react";
import { Table, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar"
import API from "../../utils/API";
import Moment from 'moment';


class AdminApproveMember extends Component {

  state = {
    users: []
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    API.getUsers()
      .then((res) => {
        console.log(res.data);
        this.setState({ users: res.data })
      })
      .catch(err => console.log(err));
  };


  approveMemberHandler = (id) => {
    API.approveMember(id).then((res) => {
      this.loadUsers()
    })
      .catch((err) => {
        console.log(err);
      });
  }


  unapproveMemberHandler = (id) => {
    console.log(id);
    API.unapproveMember(id).then((res) => {
      this.loadUsers()
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
      user.memberType.includes("admin") ?

        <body>
          <header>
            <Navbar />
          </header>

          <section id="display">
            <div>
              <h1>Pending Approvals:</h1>
              <br></br>

              <Table hover>
                <thead>
                  <tr>
                    <th>Date of Signup</th>
                    <th>Email Address</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>User Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                  {this.state.users.map(result => (
                    <tr key={result._id}>
                      <td>{Moment(result.date).format('ddd DD MMM yyyy')}</td>
                      <td>{result.emailAddress}</td>
                      <td>{result.firstName}</td>
                      <td>{result.lastName}</td>
                      <td>{result.memberType}</td>
                      <td>
                        {result.memberType == 'admin' &&
                          <h1></h1>
                        }
                        {result.memberType == 'guest' &&
                          <Button color="success" onClick={() => this.approveMemberHandler(result._id)}>Approve</Button>
                        }
                        {result.memberType == 'member' &&
                          <Button color="danger" onClick={() => this.unapproveMemberHandler(result._id)}>Un-approve</Button>
                        }

                      </td>
                    </tr>
                  ))}

                </tbody>

              </Table>
            </div></section>
        </body>

        :
        <h1>You are not authorised to view this page.</h1>
    );
  }
}
AdminApproveMember.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(AdminApproveMember);
