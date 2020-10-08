import axios from "axios";

export default {
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users/users");
  }
  ,

  approveMember: function(id) {
    return axios.put("/api/users/users/approve" + id);
  }
  ,

  unapproveMember: function(id) {
    return axios.put("/api/users/users/unapprove" + id);
  },

  // Gets all events
  getEvents: function() {
    return axios.get("/api/events/events");
  }
  ,
  
};