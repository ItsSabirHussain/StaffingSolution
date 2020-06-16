import React from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
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
import axios from "axios";
import ClientLogin from "../login/ClientLogin";

class StaffRegister extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      specialisation: "",
      email: "",
      password: "",
    };

    this.doRegister = this.doRegister.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ ...this.state, [event.id]: event.target.value });
  }

  doRegister(e) {
    e.preventDefault();
    console.log(this.state);
    axios
      .post("http://localhost:4000/staff/staffreg", {
        name: this.state.name,
        address: this.state.address,
        specialisation: this.state.specialisation,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res.data);
        this.props.history.push("/stafflogin");
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
            title={<h3 className="mt-0">Staff Registration</h3>}
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
                    name="text"
                    placeholder="Name"
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
                    type="text"
                    required
                    name="phone"
                    placeholder="Phone"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mt">
                <Label for="specialisation">Specilisation</Label>
                <InputGroup className="input-group-no-border">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="la la-user text-white" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="specialisation"
                    className="input-transparent pl-3"
                    onChange={(event) => {
                      this.setState({
                        ...this.state,
                        specialisation: event.target.value,
                      });
                    }}
                    type="text"
                    required
                    name="specialisation"
                    placeholder="Specilisation"
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
                <Link className="d-block text-center mb-4" to="stafflogin">
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

function mapStateToProps(state) {
  return {
    isFetching: state.register.isFetching,
    errorMessage: state.register.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(StaffRegister));
