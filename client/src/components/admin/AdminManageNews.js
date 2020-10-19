import React, { Component, useState } from "react";
import { Button , Table } from 'reactstrap';
// import { Table, thead, Tbody, tr, th, td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar"
import API from "../../utils/API";
import Moment from 'moment';
import Sidebar from "../dashboard/Sidebar";


class AdminManageNews extends Component {

  state = {
    posts: []
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = () => {
    API.managePosts()
      .then((res) => {
        //console.log(res);
        this.setState({ posts: res.data })
      })
      .catch(err => console.log(err));
  };


  approvePostHandler = (id) => {
    API.approvePost(id).then((res) => {
      this.loadPosts()
    })
      .catch((err) => {
        console.log(err);
      });
  }


  unapprovePostHandler = (id) => {
    API.unapprovePost(id).then((res) => {
      this.loadPosts()
    })
      .catch((err) => {
        console.log(err);
      });
  }

  removePostHandler = (id) => {
    API.removePost(id).then((res) => {
      this.loadPosts()
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
                <h1>Manage News</h1>
                <br></br>

                <Table hover>
                  <thead>
                    <tr>
                      <th>Creation Date</th>
                      <th>Posted by</th>
                      <th>Title</th>
                      <th>Text</th>
                      <th>Action</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>

                    {this.state.posts.map(result => (
                      <tr key={result._id}>
                        <td>{Moment(result.creationDate).format('DD MMM yyyy hh:mm A')}</td>
                        <td>{result.creator_details[0].firstName} {result.creator_details[0].lastName}</td>
                        <td>{result.postTitle}</td>
                        <td>{result.postText} 
                        { result.postImageURL &&
                        <a href={result.postImageURL} target="_blank"><i className="fas fa-image"></i></a>
                        }
                        </td>
                        <td>
                          {user.memberType == 'admin' && !result.postApproved &&
                            <Button color="success" onClick={() => this.approvePostHandler(result._id)}>Approve</Button>
                          }
                          {user.memberType == 'admin' && result.postApproved &&
                            <Button color="danger" onClick={() => this.unapprovePostHandler(result._id)}>Un-approve</Button>
                          }

                        </td>
                        {
                          result.memberType != 'admin' &&
                          <td><Button color="danger" onClick={() => this.removePostHandler(result._id)}>X</Button> </td>
                        }
                      </tr>
                    ))}

                  </tbody>

                </Table>
              </div>
              </section>

          </div>
        </body>

        :
        <h1>You are not authorised to view this page.</h1>
    );
  }
}
AdminManageNews.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(AdminManageNews);
