import React, { Component, useState } from "react";
import { Button , Table } from 'reactstrap';
// import { table, Thead, Tbody, tr, th, td } from 'react-super-responsive-table';
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar"
import API from "../../utils/API";
import Moment from 'moment';
import Sidebar from "../dashboard/Sidebar";


class AdminManageMembers extends Component {

  state = {
    users: []
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    API.getUsers()
      .then((res) => {
        //console.log(res.data);
        this.setState({ users: res.data })
      })
      .catch(err => console.log(err));
  };


  approveMemberHandler = (id) => {
    API.approveMember(id).then((res) => {
      //console.log(res);
      this.loadUsers()
    })
      .catch((err) => {
        console.log(err);
      });
  }


  unapproveMemberHandler = (id) => {
    API.unapproveMember(id).then((res) => {
      this.loadUsers()
    })
      .catch((err) => {
        console.log(err);
      });
  }

  removeMemberHandler = (id) => {
    API.removeMember(id).then((res) => {
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
      this.props.auth.isAuthenticated && user.memberType.includes("admin") ?

        <body>
          <input type="checkbox" id="check"/>
          <header>
            <Navbar />
          </header>

          <div className='dashboardSections'>

          <Sidebar />

          <section id="display">
            <div className="dash-main-container">
              <h1>Manage Members</h1>
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
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>

                  {this.state.users.map(result => (
                    <tr key={result._id}>
                      <td>{Moment(result.date).format('DD MMM yyyy hh:mm A')}</td>
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
                      {
                        result.memberType != 'admin' &&
                        <td><Button color="danger" onClick={() => this.removeMemberHandler(result._id)}>X</Button> </td>
                      }
                    </tr>
                  ))}

                </tbody>

              </Table>
            </div></section>
            
            </div>
        </body>

        :
        <h1>You are not authorised to view this page.</h1>
    );
  }
}
AdminManageMembers.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(AdminManageMembers);
