import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";
import Header from "../Header/AdminHeader";
import Sidebar from "../Sidebar/AdminSidebar";
import BreadcrumbHistory from "../BreadcrumbHistory/BreadcrumbHistory";
import s from "./Layout.module.scss";
import AdmissionDashboard from "../../CustomComponents/Admin/dashboard/AdmiDashboard";
import JobsRequestsList from "../../CustomComponents/Admin/jobsRequestsList/jobsRequestsList";
import CompaniesList from "../../CustomComponents/Admin/companiesList/companiesList";
import StaffList from "../../CustomComponents/Admin/staffList/staffList";
import Attendance from "../../CustomComponents/Admin/attendance/attendance";
import TimeSheet from "../../CustomComponents/Admin/timesheet/timesheet";
import PaymentList from "../../CustomComponents/Admin/recievedPayment/recievedPayment";
import { withRouter } from "react-router-dom";

class AdmissionLayout extends React.Component {
  constructor(props) {
    super(props);
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
          <Header />
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
                      path="/admin"
                      exact
                      render={() => <Redirect to="/admin/dashboard" />}
                    />
                    <Route
                      path="/admin/dashboard"
                      exact
                      component={AdmissionDashboard}
                    />
                    <Route
                      path="/admin/jobsrequestslist"
                      exact
                      component={JobsRequestsList}
                    />
                    <Route
                      path="/admin/companieslist"
                      exact
                      component={CompaniesList}
                    />
                    <Route
                      path="/admin/stafflist"
                      exact
                      component={StaffList}
                    />
                    <Route
                      path="/admin/attendance"
                      exact
                      component={Attendance}
                    />
                    <Route
                      path="/admin/timesheet"
                      exact
                      component={TimeSheet}
                    />
                    <Route
                      path="/admin/receivedpayments"
                      exact
                      component={PaymentList}
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

export default withRouter(AdmissionLayout);
