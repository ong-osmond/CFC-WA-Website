import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatetimePicker from 'react-datetime';
import Moment from 'moment';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";
import "react-datetime/css/react-datetime.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Moment.locale('en');

class PostForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
            posttTitle: '',
            postText: '',
            creator_id: this.props.auth.user.id,
            postImageURL: ''

        };
    }

    handleInputChange = (post) => {
        post.preventDefault();
        const { id, value } = post.target;
        this.setState({ ...this.state, [id]: value });
    }

    // Save the post using the Create Event API
    callCreatePostAPI = () => {
        let request = {
            postTitle: this.state.postTitle,
            postText: this.state.postText,
            postImageURL: this.state.postImageURL,
            creator_id : this.state.creator_id
        };
        API.createPost(request).then((res) => {
            toast.success('Thank you for submitting a post. The Administrator will review the post before it is published.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.props.toggleModal();
            this.setState({
                postTitle: '',
                postText: '',
                postImageURL: ''
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    createPostHandler = () => {
        if (this.state.postTitle == ''
            || this.state.postText == '') {
            toast.error('You have not completed all required fields.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            // Find the image uploaded
            const { files } = document.querySelector('input[type="file"]');
            if (files.length > 0) {
                const formData = new FormData();
                formData.append('file', files[0]);
                formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
                const options = {
                    method: 'POST',
                    body: formData,
                };
                return fetch(`https://api.Cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, options)
                    .then(res => res.json())
                    .then(res => {
                        this.state.postImageURL = (res.secure_url);
                        this.callCreatePostAPI();
                    }) // Set the eventImageURL returned by Cloudinary
                    .catch(err => console.log(err));
            } else {
                this.callCreatePostAPI();
            }
        }
    }

    render() {
        const { user } = this.props.auth;
        return (
            <Form>

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

                <FormGroup>
                    <Label for="postTitle">Title or Subject</Label>
                    <Input type="textarea" id="postTitle" onChange={this.handleInputChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="postText">Details</Label>
                    <Input className="form-control input-lg" type="textarea" id="postText" onChange={this.handleInputChange} required />
                </FormGroup>



                <div className="form-group">
                    <Label>Upload a photo</Label>
                    <p><input type="file" /></p>
                </div>

                {this.props.auth.isAuthenticated &&
                    <Button color="success"

                        onClick={this.createPostHandler}>Submit</Button>
                }
            </Form>

        );
    }
}


PostForm.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(PostForm);
