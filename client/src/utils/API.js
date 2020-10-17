import axios from "axios";

export default {
  // Gets all users
  getUsers: function () {
    return axios.get("/api/users/users");
  }
  ,

  // Gets all users pending approval
  getPendingUsers: function () {
    return axios.get("/api/users/pending");
  }
  ,

  // Approve a member
  approveMember: function (id) {
    return axios.put("/api/users/users/approve" + id);
  }
  ,

  // Unapprove a member
  unapproveMember: function (id) {
    return axios.put("/api/users/users/unapprove" + id);
  },

  // Remove a member
  removeMember: function (id) {
    return axios.put("/api/users/users/remove" + id);
  },

  // Gets all upcoming events
  getEvents: function () {
    return axios.get("/api/events/events/upcoming");
  }
  ,

  // Admin manage events
  manageEvents: function () {
    return axios.get("/api/events/events/manage");
  }
  ,

  // Create an event
  createEvent: function (request) {
    return axios.post("api/events/event/create", request)
  }
  ,


  // Approve an event
  approveEvent: function (id) {
    return axios.put("/api/events/event/approve" + id);
  }
  ,

  // Unapprove an event
  unapproveEvent: function (id) {
    return axios.put("/api/events/event/unapprove" + id);
  }
  ,

  // Join an event
  joinEvent: function (request) {
    return axios.put("api/events/event/join" + request.id, request)
  }
  ,

  // Unjoin an event
  unjoinEvent: function (request) {
    return axios.put("api/events/event/unjoin" + request.id, request)
  }
  ,

  // Remove an event
  removeEvent: function (id) {
    return axios.put("/api/events/event/remove" + id);
  }
  ,

  // Print attendance sheet
  printEventDetails: function (id) {
    console.log("/api/events/event/eventDetails" + id);
    return axios.get("/api/events/event/eventDetails" + id);
  }
  ,
  
  // Get member info
  getMemberInfo: function (id) {
    return axios.get("/api/users/user/info" + id);
  }

  ,

  // Create a post
  createPost: function (request) {
    return axios.post("api/posts/post/create", request)
  }
  
  ,
  // Gets all current posts
  getPosts: function () {
    return axios.get("/api/posts/posts/current");
  }
  ,

  // Admin manage posts
  managePosts: function () {
    return axios.get("/api/posts/posts/manage");
  }
  ,

  // Approve a post
  approvePost: function (id) {
    return axios.put("/api/posts/post/approve" + id);
  }
  ,

  // Unapprove a post
  unapprovePost: function (id) {
    return axios.put("/api/posts/post/unapprove" + id);
  }
  ,

  // Remove a post
  removePost: function (id) {
    return axios.put("/api/posts/post/remove" + id);
  }
  ,

};