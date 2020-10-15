import React, { Component, useState } from "react";
import { Button } from 'reactstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
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
        console.log(res.data);
        this.setState({ users: res.data })
      })
      .catch(err => console.log(err));
  };


  approveMemberHandler = (id) => {
    API.approveMember(id).then((res) => {
      console.log(res);
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
          <header>
            <Navbar />
          </header>

          <div className='dashboardSections'>

            <section className="d-none d-sm-block">
              <Sidebar />
            </section>

            <section id="adminDisplay">
              <div>
                <h1>Manage Members</h1>
                <br></br>

                <Table hover>
                  <Thead>
                    <Tr>
                      <Th>Date of Signup</Th>
                      <Th>Email Address</Th>
                      <Th>First Name</Th>
                      <Th>Last Name</Th>
                      <Th>User Role</Th>
                      <Th>Action</Th>
                      <Th>Remove</Th>
                    </Tr>
                  </Thead>
                  <Tbody>

                    {this.state.users.map(result => (
                      <Tr key={result._id}>
                        <Td>{Moment(result.date).format('DD MMM yyyy hh:mm A')}</Td>
                        <Td>{result.emailAddress}</Td>
                        <Td>{result.firstName}</Td>
                        <Td>{result.lastName}</Td>
                        <Td>{result.memberType}</Td>
                        <Td>
                          {result.memberType == 'admin' &&
                            <h1></h1>
                          }
                          {result.memberType == 'guest' &&
                            <Button color="success" onClick={() => this.approveMemberHandler(result._id)}>Approve</Button>
                          }
                          {result.memberType == 'member' &&
                            <Button color="danger" onClick={() => this.unapproveMemberHandler(result._id)}>Un-approve</Button>
                          }
                        </Td>
                        {
                          result.memberType != 'admin' &&
                          <Td><Button color="danger" onClick={() => this.removeMemberHandler(result._id)}>X</Button> </Td>
                        }
                      </Tr>
                    ))}

                  </Tbody>

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
