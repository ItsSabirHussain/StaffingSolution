import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";
import Header from "../Header/StaffHeader";
import Sidebar from "../Sidebar/StaffSidebar";
import BreadcrumbHistory from "../BreadcrumbHistory/BreadcrumbHistory";
import s from "./Layout.module.scss";
import StaffDashboard from "../../CustomComponents/Staff/dashboard/StaffDashboard";
import Attendance from "../../CustomComponents/Staff/attendance/attendance";
import CurrentJobs from "../../CustomComponents/Staff/currentJobs/currentJobs";
import PaymentList from "../../CustomComponents/Staff/recievedPayment/recievedPayment";
import axios from "axios";
import { withRouter } from "react-router-dom";

class FacultyLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staff: {},
    };
  }
  componentDidMount() {
    console.log(localStorage.getItem("StaffID"));
    axios
      .post("http://localhost:4000/staff/staffdashboard", {
        id: localStorage.getItem("StaffID"),
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ ...this.state, staff: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }
  render() {
    return (
      <div
        className={[
          s.root,
          "sidebar-" + this.props.sidebarPosition,
          "sidebar-" + this.props.sidebarVisibility,
        ].join(" ")}
      >
        <div className={s.wrap}>
          <Header staffName={this.state.staff.Name} />
          {/* <Chat chatOpen={this.state.chatOpen} /> */}
          {/* <Helper /> */}
          <Sidebar />
          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <BreadcrumbHistory url={this.props.location.pathname} />
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route
                      path="/staff"
                      exact
                      render={() => <Redirect to="/staff/dashboard" />}
                    />
                    <Route
                      path="/staff/dashboard"
                      exact
                      component={() => (
                        <StaffDashboard staff={this.state.staff} />
                      )}
                    />
                    <Route
                      path="/staff/currentjobs"
                      exact
                      component={() => <CurrentJobs staff={this.state.staff} />}
                    />
                    <Route
                      path="/staff/attendance"
                      exact
                      component={() => <Attendance staff={this.state.staff} />}
                    />
                    <Route
                      path="/staff/receivedpayments"
                      exact
                      component={() => <PaymentList staff={this.state.staff} />}
                    />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              <footer className={s.contentFooter}>Staffing Solution</footer>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

export default withRouter(FacultyLayout);
