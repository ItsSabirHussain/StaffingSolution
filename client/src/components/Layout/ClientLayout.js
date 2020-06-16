import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";
import Header from "../Header/ClientHeader";
import Sidebar from "../Sidebar/ClientSidebar";
import BreadcrumbHistory from "../BreadcrumbHistory/BreadcrumbHistory";
import s from "./Layout.module.scss";
import ClientDashboard from "../../CustomComponents/Client/dashboard/ClientDashboard";
import SendRequest from "../../CustomComponents/Client/sendRequest/sendRequest";
import JobsStatus from "../../CustomComponents/Client/jobsStatus/jobsStatus";
import StaffList from "../../CustomComponents/Client/staffList/staffList";
import Payment from "../../CustomComponents/Client/payToAdmin/payment";
import SendReview from "../../CustomComponents/Client/sendReview/sendReview";
import axios from "axios";
import { withRouter } from "react-router-dom";

class FinanceManagerLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {},
    };
  }
  componentDidMount() {
    axios
      .post("http://localhost:4000/client/clientdashboard", {
        id: localStorage.getItem("ClientID"),
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ ...this.state, client: res.data });
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
          <Header clientName={this.state.client.Representative} />
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
                      path="/client"
                      exact
                      render={() => <Redirect to="/client/dashboard" />}
                    />
                    <Route
                      path="/client/dashboard"
                      exact
                      component={() => (
                        <ClientDashboard client={this.state.client} />
                      )}
                    />
                    <Route
                      path="/client/job/sendrequest"
                      exact
                      component={(props) => (
                        <SendRequest {...props} client={this.state.client} />
                      )}
                    />
                    <Route
                      path="/client/job/jobsstatus"
                      exact
                      component={(props) => (
                        <JobsStatus {...props} client={this.state.client} />
                      )}
                    />
                    <Route
                      path="/client/job/staffdetails"
                      exact
                      component={() => <StaffList client={this.state.client} />}
                    />
                    <Route
                      path="/client/payment"
                      exact
                      component={(props) => (
                        <Payment {...props} client={this.state.client} />
                      )}
                    />
                    <Route
                      path="/client/sendreview"
                      exact
                      component={(props) => (
                        <SendReview {...props} client={this.state.client} />
                      )}
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

export default withRouter(FinanceManagerLayout);
