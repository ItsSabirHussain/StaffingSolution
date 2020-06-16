import React from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Alert,
  Button,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";

class ClientLogin extends React.Component {
  static isAuthenticated(token) {
    if (token) return true;
  }
  constructor(props) {
    super(props);

    this.state = {
      email: "admin@staffingsolution.",
      password: "password",
    };

    this.doLogin = this.doLogin.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.signUp = this.signUp.bind(this);
  }
  changeEmail(e) {
    this.setState({ ...this.state, email: e.target.value });
  }
  changePassword(e) {
    this.setState({ ...this.state, passowrd: e.target.value });
  }
  doLogin(e) {
    e.preventDefault();
    localStorage.setItem("admission", "authenticated");
    this.props.history.push("/admin");
  }

  signUp() {
    this.props.history.push("/");
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/admin" },
    }; // eslint-disable-line

    // cant access login page while logged in
    if (
      ClientLogin.isAuthenticated(
        JSON.parse(localStorage.getItem("authenticated"))
      )
    ) {
      return <Redirect to={from} />;
    }
    return (
      <div className="auth-page">
        <Container>
          <Widget
            className="widget-auth mx-auto"
            title={<h3 className="mt-0">Admin Login</h3>}
          >
            <p className="widget-auth-info">Use your credentials to login</p>
            <form onSubmit={this.doLogin}>
              {this.props.errorMessage && (
                <Alert
                  className="alert-sm widget-middle-overflow rounded-0"
                  color="danger"
                >
                  {this.props.errorMessage}
                </Alert>
              )}
              <FormGroup className="mt">
                <Label for="email">Email</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-user text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="email"
                    className="input-transparent pl-3"
                    onChange={this.changeEmail}
                    type="email"
                    required
                    name="email"
                    placeholder="email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-lock text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="password"
                    className="input-transparent pl-3"
                    onChange={this.changePassword}
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="bg-widget auth-widget-footer">
                <Button
                  type="submit"
                  color="default"
                  className="auth-btn"
                  size="sm"
                  style={{ color: "#fff" }}
                >
                  {this.props.isFetching ? "Loading..." : "Login"}
                </Button>

                <p className="widget-auth-info mt-4" style={{ color: "white" }}>
                  For manager click below!
                </p>
                <Link className="d-block text-center mb-4" to="managerlogin">
                  Click for manager login
                </Link>

                <p className="widget-auth-info mt-4" style={{ color: "white" }}>
                  For staff click below!
                </p>
                <Link className="d-block text-center mb-4" to="stafflogin">
                  Click for staff login
                </Link>

                <p className="widget-auth-info mt-4" style={{ color: "white" }}>
                  For client click below!
                </p>
                <Link className="d-block text-center mb-4" to="clientlogin">
                  Click for client login
                </Link>
              </div>
            </form>
          </Widget>
        </Container>
        <footer className="auth-footer">2020 &copy; Staffing Solution</footer>
      </div>
    );
  }
}

export default ClientLogin;
