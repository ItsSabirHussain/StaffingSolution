import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";
import Dashboard from "../../CustomComponents/Manager/dashboard/ManagerDashboard";
import Header from "../Header/ManagerHeader";
import Sidebar from "../Sidebar/ManagerSidebar";
import BreadcrumbHistory from "../BreadcrumbHistory/BreadcrumbHistory";
import { openSidebar, closeSidebar } from "../../actions/navigation";
import s from "./Layout.module.scss";
import JobsRequestsList from "../../CustomComponents/Manager/jobsRequestsList/jobsRequestsList";
import Attendance from "../../CustomComponents/Manager/attendance/attendance";
import StaffList from "../../CustomComponents/Manager/staffList/staffList";
import Payment from "../../CustomComponents/Manager/payToStaff/payToStaff";
import PaymentList from "../../CustomComponents/Manager/recievedPayment/recievedPayment";
class RegistrarLayout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
  };
  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
  }

  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4 && !this.state.chatOpen) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }

      this.setState({ chatOpen: e.direction === 2 });
    }
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
                      path="/manager"
                      exact
                      render={() => <Redirect to="/manager/dashboard" />}
                    />
                    <Route
                      path="/manager/dashboard"
                      exact
                      component={Dashboard}
                    />
                    <Route
                      path="/manager/jobsrequests"
                      exact
                      component={JobsRequestsList}
                    />
                    <Route
                      path="/manager/attendance"
                      exact
                      component={Attendance}
                    />
                    <Route
                      path="/manager/staff/list"
                      exact
                      component={StaffList}
                    />
                    <Route
                      path="/manager/staff/payment/"
                      exact
                      component={Payment}
                    />
                    <Route
                      path="/manager/receivedpayment"
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

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarPosition: store.navigation.sidebarPosition,
    sidebarVisibility: store.navigation.sidebarVisibility,
  };
}

export default withRouter(connect(mapStateToProps)(RegistrarLayout));
