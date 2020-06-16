import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  Label,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import { Form, FormGroup, Input, FormFeedback } from "reactstrap";
import Widget from "../../../components/Widget/Widget";

class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      name: "",
      fatherName: "",
      dob: Date,
      gender: "",
      address: "",
      gender: "",
      phone: "",
      email: "",
      enrolDate: Date,
      touched: {
        name: false,
        fatherName: false,
        phone: false,
        email: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  submitComment(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    console.log("Current state is: " + JSON.stringify(this.state));
    alert("Current state is: " + JSON.stringify(this.state));
    e.preventDefault();
  }
  handleBlue = (field) => (e) => {
    this.setState({ touched: { ...this.state.touched, [field]: true } });
  };
  validate(name, fatherName, phone, email) {
    const error = {
      name: "",
      fatherName: "",
      phone: "",
      email: "",
    };
    if (this.state.touched.name && name.length < 3) {
      error.name = "First Name shoud be greater than equal to 3";
    } else if (this.state.touched && name.length > 10) {
      error.name = "First Name shoud be less than equal to 10";
    }
    if (this.state.touched.fatherName && fatherName.length < 3) {
      error.fatherName = "Last Name shoud be greater than equal to 3";
    } else if (this.state.touched.fatherName && fatherName.length > 10) {
      error.fatherName = "Last Name shoud be less than equal to 10";
    }

    const reg = /^\d+$/;
    if (this.state.touched.phone && !reg.test(phone)) {
      error.phone = "Tel. Number should contain only number";
    }
    if (
      this.state.touched.email &&
      email.split("").filter((x) => x === "@").length !== 1
    ) {
      error.email = "Email should contain a '@' sign";
    }
    return error;
  }
  render() {
    const errors = this.validate(
      this.state.name,
      this.state.fatherName,
      this.state.phone,
      this.state.email
    );
    return (
      <div>
        <Button
          color="default"
          className="btn btn-light border border-dark"
          onClick={this.toggleModal}
        >
          <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
          &nbsp; View
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader
            toggle={this.toggleModal}
            style={{ background: "#ead4c9", color: "black" }}
          >
            <strong>
              <h3 className="display-5">Student Info</h3>
            </strong>
          </ModalHeader>
          <ModalBody style={{ background: "white", color: "black" }}>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup row>
                        <Label htmlFor="name" md={3}>
                          Name
                        </Label>
                        <Label htmlFor="name" md={9}>
                          <h4 className="display-6">{this.props.data.name}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="fatherName" md={3}>
                          Father Name
                        </Label>
                        <Label htmlFor="fathername" md={9}>
                          <h4 className="display-6">
                            {this.props.data.fathername}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="address" md={3}>
                          Address
                        </Label>
                        <Label htmlFor="address" md={9}>
                          <h4 className="display-6">
                            {this.props.data.address}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="phone" md={3}>
                          Phone
                        </Label>
                        <Label htmlFor="phone" md={9}>
                          <h4 className="display-6">{this.props.data.phone}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="dob" md={3}>
                          Date of Birth
                        </Label>
                        <Label htmlFor="dob" md={9}>
                          <h4 className="display-6">{this.props.data.dob}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="Department" md={3}>
                          Department
                        </Label>
                        <Label htmlFor="department" md={9}>
                          <h4 className="display-6">
                            {this.props.data.department}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="email" md={3}>
                          Email
                        </Label>
                        <Label htmlFor="email" md={9}>
                          <h4 className="display-6">{this.props.data.email}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="enrolDate" md={3}>
                          Enrol Date
                        </Label>
                        <Label htmlFor="enrolDate" md={9}>
                          <h4 className="display-6">
                            {this.props.data.enroldate}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={{ size: 10, offset: 4 }}>
                          <Button type="submit" color="primary">
                            Back
                          </Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default EditStudent;
