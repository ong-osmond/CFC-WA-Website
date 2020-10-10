import axios from "axios";

export default {
  // Gets all users
  getUsers: function () {
    return axios.get("/api/users/users");
  }
  ,

  approveMember: function (id) {
    return axios.put("/api/users/users/approve" + id);
  }
  ,

  unapproveMember: function (id) {
    return axios.put("/api/users/users/unapprove" + id);
  },

  // Gets all events
  getEvents: function () {
    return axios.get("/api/events/events");
  }
  ,

  // Create an event
  createEvent: function (request) {
    return axios.post("api/events/event/create", request)
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

};