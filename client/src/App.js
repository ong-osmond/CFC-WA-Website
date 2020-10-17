import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import EventsFeed from "./components/events/EventsFeed";
import EventForm from "./components/events/EventForm";
//import Profile from "./components/profile/Profile";
import AdminManageMembers from "./components/admin/AdminManageMembers";
import AdminManageEvents from "./components/admin/AdminManageEvents";
import EventDetails from "./components/events/EventDetails";



// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  console.log(decoded);
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/events" component={EventsFeed} />

            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              {/* <PrivateRoute exact path="/profile" component={Profile} /> */}
              <PrivateRoute exact path="/admin/members/manage" component={AdminManageMembers} />
              <PrivateRoute exact path="/admin/events/manage" component={AdminManageEvents} />
              <PrivateRoute exact path="/events/create" component={EventForm} />
              <PrivateRoute exact path="/eventDetails" component={EventDetails} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;