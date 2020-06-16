import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

/* eslint-disable */
import ErrorPage from "../pages/error";
/* eslint-enable */

import "../styles/theme.scss";
import AdminLayoutComponent from "./Layout/AdminLayout";
import ManagerLayoutComponent from "./Layout/ManagerLayout";
import StaffLayoutComponent from "./Layout/StaffLayout";
import ClientComponent from "./Layout/ClientLayout";
import ClientLogin from "../pages/login/ClientLogin";
import StaffLogin from "../pages/login/StaffLogin";
import ClientRegister from "../pages/register/ClientRegister";
import StaffRegister from "../pages/register/StaffRegister";
import AdminLogin from "../pages/login/AdminLogin";
import ManagerLogin from "../pages/login/ManagerLogin";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Redirect to="/adminlogin" />}
            />
            <Route path="/admin" component={AdminLayoutComponent} />
            <Route path="/manager" component={ManagerLayoutComponent} />
            <Route path="/staff" component={StaffLayoutComponent} />
            <Route path="/client" component={ClientComponent} />
            <Route path="/clientregister" exact component={ClientRegister} />
            <Route path="/clientlogin" exact component={ClientLogin} />
            <Route path="/staffregister" exact component={StaffRegister} />
            <Route path="/stafflogin" exact component={StaffLogin} />
            <Route path="/adminlogin" exact component={AdminLogin} />
            <Route path="/managerlogin" exact component={ManagerLogin} />
            <Route path="/error" exact component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
