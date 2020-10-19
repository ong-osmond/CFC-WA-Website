import React, { Component, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";
import Navbar from "../layout/Navbar"
import Moment from 'moment';
import PostForm from "./PostForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostDetails from "./PostDetails";


Moment.locale('en');

class PostsFeed extends Component {

    constructor(props) {

        super(props);

        this.state = {
            posts: [],
            displayModal: false,
            postDetails: {},
            printPostModal: false
        };
    }

    toggle = () => {
        let toggledValue = !this.state.displayModal;
        this.setState({
            displayModal: toggledValue,
        });
    };


    componentDidMount() {
        this.loadPosts();
    }

    loadPosts = () => {
        API.getPosts()
            .then((res) => {
                //console.log(res);
                this.setState({ posts: res.data })
            })
            .catch(err => console.log(err));
    };


    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (

            <body>
                <header>
                    <Navbar />
                </header>

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

                <section id="so_display">
                    <div className="container">
                        {this.props.auth.isAuthenticated && (this.props.auth.user.memberType == 'member' ||
                            this.props.auth.user.memberType == 'admin') &&
                            <Button color="success" onClick={() => {
                                this.toggle()
                            }}
                                className="addEventBtn">Post Something</Button>
                        }

                        <h2>News</h2>

                        <hr></hr>

                        {this.state.posts.map(result => (
                            <section id="eventfeed">
                                <div className="container">

                                    <div key={result._id}>

                                        <div className="newsfeed">
                                            <h1>{result.postTitle}</h1>
                                            {/* <p><span className="highlight">{result.postTitle} </span></p> */}
                                            <h6>Posted by {result.creator_details[0].firstName}&nbsp;{result.creator_details[0].lastName}&nbsp;on&nbsp;{Moment(result.creationDate).format('DD MMM yyyy hh:mm A')}</h6>
                                            <div className="row">
                                                {result.postImageURL &&
                                                    <article id="news-main-photo">
                                                        <img src={result.postImageURL} />
                                                    </article>
                                                }
                                                <aside id="news-main-col">
                                                    <p>{result.postText}</p>
                                                </aside>


                                            </div>

                                        </div>






                                    </div>


                                </div>
                                <hr></hr>
                            </section>
                        ))}

                    </div></section>


                <Modal isOpen={this.state.displayModal} >
                    <ModalHeader >Post Something</ModalHeader>
                    <ModalBody>
                        <PostForm toggleModal={this.toggle} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => { this.toggle() }}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            </body>
        );
    }
}
PostsFeed.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(PostsFeed);
