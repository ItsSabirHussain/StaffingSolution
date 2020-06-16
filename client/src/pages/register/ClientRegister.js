import React from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";

import axios from "axios";

import {
  Container,
  Alert,
  Button,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import { registerUser, registerError } from "../../actions/register";
import ClientLogin from "../login/ClientLogin";

class ClientRegister extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      designation: "",
      phone: "",
      address: "",
      companyName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    this.doRegister = this.doRegister.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    console.log(event);
    console.log(event.target.value);
    this.setState({ ...this.state, [event.id]: event.target.value });
  }

  isPasswordValid() {
    return (
      this.state.password && this.state.password === this.state.confirmPassword
    );
  }

  doRegister(e) {
    e.preventDefault();
    console.log(this.state);
    axios
      .post("http://localhost:4000/client/clientreg", {
        Representative: this.state.name,
        Designation: this.state.designation,
        Address: this.state.address,
        Phone: this.state.phone,
        CompanyName: this.state.companyName,
        Email: this.state.email,
        Password: this.state.password,
      })
      .then((res) => {
        console.log(res.data);
        this.props.history.push("/clientlogin");
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/app" },
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
            title={<h3 className="mt-0">Client Registration</h3>}
          >
            <p className="widget-auth-info">Please fill all fields below.</p>
            <form onSubmit={this.doRegister}>
              {this.props.errorMessage && (
                <Alert
                  className="alert-sm widget-middle-overflow rounded-0"
                  color="danger"
                >
                  {this.props.errorMessage}
                </Alert>
              )}
              <FormGroup className="mt">
                <Label for="name">Name</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-user text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="name"
                    className="input-transparent pl-3"
                    onChange={(event) => {
                      this.setState({
                        ...this.state,
                        name: event.target.value,
                      });
                    }}
                    type="text"
                    required
                    name="name"
                    placeholder="Name"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mt">
                <Label for="designation">Designation</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-user text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="designation"
                    className="input-transparent pl-3"
                    onChange={(event) => {
                      this.setState({
                        ...this.state,
                        designation: event.target.value,
                      });
                    }}
                    type="designation"
                    required
                    name="designation"
                    placeholder="Designation"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mt">
                <Label for="address">Address</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-user text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="address"
                    className="input-transparent pl-3"
                    onChange={(event) => {
                      this.setState({
                        ...this.state,
                        address: event.target.value,
                      });
                    }}
                    type="text"
                    required
                    name="address"
                    placeholder="Address"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mt">
                <Label for="phone">Phone</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-user text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="phone"
                    className="input-transparent pl-3"
                    onChange={(event) => {
                      this.setState({
                        ...this.state,
                        phone: event.target.value,
                      });
                    }}
                    type="tel"
                    required
                    name="phone"
                    placeholder="Phone"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mt">
                <Label for="companyname">Company Name</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-user text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="companyName"
                    className="input-transparent pl-3"
                    onChange={(event) => {
                      this.setState({
                        ...this.state,
                        companyName: event.target.value,
                      });
                    }}
                    type="text"
                    required
                    name="companyName"
                    placeholder="Company Name"
                  />
                </InputGroup>
              </FormGroup>
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
                    onChange={(event) => {
                      this.setState({
                        ...this.state,
                        email: event.target.value,
                      });
                    }}
                    type="email"
                    required
                    name="email"
                    placeholder="Email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mt">
                <Label for="password">Password</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-user text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="password"
                    className="input-transparent pl-3"
                    onChange={(event) => {
                      this.setState({
                        ...this.state,
                        password: event.target.value,
                      });
                    }}
                    type="password"
                    required
                    name="password"
                    placeholder="Passowrd"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirm</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-lock text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="confirmPassword"
                    className="input-transparent pl-3"
                    onChange={this.onChange}
                    onBlur={this.checkPassword}
                    type="password"
                    required
                    name="confirmPassword"
                    placeholder="Confirm"
                  />
                </InputGroup>
              </FormGroup>
              <div className="bg-widget-transparent auth-widget-footer">
                <Button
                  type="submit"
                  color="default"
                  className="auth-btn"
                  size="sm"
                  style={{ color: "#fff" }}
                >
                  {this.props.isFetching ? "Loading..." : "Register"}
                </Button>
                <p className="widget-auth-info mt-4">
                  Already have the account? Login now!
                </p>
                <Link className="d-block text-center mb-4" to="clientlogin">
                  Enter the account
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

export default ClientRegister;
