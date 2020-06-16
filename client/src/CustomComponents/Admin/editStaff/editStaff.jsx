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
import axios from "axios";

class EditStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      name: this.props.data.Name,
      specialisation: this.props.data.Specialisation,
      email: this.props.data.Email,
      phone: this.props.data.Phone,
      address: this.props.data.Address,
      currentJob: this.props.data.CurrentJob,
      days: this.props.data.Days,
      checkin: this.props.data.CheckIn,
      checkout: this.props.data.CheckOut,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/admin/updatestaff", {
        Name: this.state.name,
        Specialisation: this.state.specialisation,
        Address: this.state.address,
        Phone: this.state.phone,
        CheckIn: this.state.checkin,
        CheckOut: this.state.checkout,
        Email: this.state.email,
        Days: this.state.days,
        CurrentJob: this.state.currentJob,
        staffID: this.props.data._id,
      })
      .then((res) => {
        alert("Staff Updated Successfully.");
        this.props.history.push("/admin/stafflist");
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div>
        <Button
          color="default"
          className="btn btn-light border border-dark"
          onClick={this.toggleModal}
        >
          <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
          &nbsp; Edit
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader
            toggle={this.toggleModal}
            style={{ background: "#4a6ddf", color: "white" }}
          >
            <h4>Edit Staff Information</h4>
          </ModalHeader>
          <ModalBody style={{ background: "white", color: "black" }}>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup row>
                        <Label htmlFor="name" md={4}>
                          Name
                        </Label>

                        <Col lg={8}>
                          <Input
                            style={{
                              background: "#4a6ddf",
                              color: "white",
                            }}
                            type="text"
                            id="name"
                            name="name"
                            placeholder={this.props.data.Name}
                            onChange={(event) => {
                              this.setState({
                                ...this.state,
                                name: event.target.value,
                              });
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="specialisation" md={4}>
                          Specialisation
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#4a6ddf",
                              color: "white",
                            }}
                            type="text"
                            id="specialisation"
                            name="specialisation"
                            placeholder={this.props.data.Specialisation}
                            onChange={(event) => {
                              this.setState({
                                ...this.state,
                                specialisation: event.target.value,
                              });
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="address" md={4}>
                          Address
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#4a6ddf",
                              color: "white",
                            }}
                            type="text"
                            id="address"
                            name="address"
                            placeholder={this.props.data.Address}
                            onChange={(event) => {
                              this.setState({
                                ...this.state,
                                address: event.target.value,
                              });
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="phone" md={4}>
                          Phone
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#4a6ddf",
                              color: "white",
                            }}
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder={this.props.data.Phone}
                            onChange={(event) => {
                              this.setState({
                                ...this.state,
                                phone: event.target.value,
                              });
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="email" md={4}>
                          Email
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#4a6ddf",
                              color: "white",
                            }}
                            type="email"
                            id="email"
                            name="email"
                            placeholder={this.props.data.Email}
                            onChange={(event) => {
                              this.setState({
                                ...this.state,
                                email: event.target.value,
                              });
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={{ size: 10, offset: 4 }}>
                          <Button type="submit" color="primary">
                            Submit
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

export default EditStaff;
