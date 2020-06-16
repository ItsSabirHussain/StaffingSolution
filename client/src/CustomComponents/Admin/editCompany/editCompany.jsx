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

class EditCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      designation: this.props.data.Designation,
      representative: this.props.data.Representative,
      phone: this.props.data.Phone,
      address: this.props.data.Address,
      companyName: this.props.data.CompanyName,
      email: this.props.data.Email,
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
    console.log(this.props.data._id);
    axios
      .post("http://localhost:4000/admin/updatecompany", {
        Representative: this.state.representative,
        Designation: this.state.designation,
        Address: this.state.address,
        Phone: this.state.phone,
        CompanyName: this.state.companyName,
        Email: this.state.email,
        ComapanyID: this.props.data._id,
      })
      .then((res) => {
        alert("Company Updated Successfully.");
        this.props.history.push("/admin/companieslist");
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
            style={{ background: "#4a6ddf", color: "black" }}
          >
            <h4>Edit Comapny Info</h4>
          </ModalHeader>
          <ModalBody style={{ background: "white", color: "black" }}>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup row>
                        <Label htmlFor="representative" md={4}>
                          Representative
                        </Label>

                        <Col lg={8}>
                          <Input
                            style={{
                              background: "white",
                              color: "black",
                            }}
                            type="text"
                            id="representative"
                            name="representative"
                            placeholder={this.props.data.Representative}
                            onChange={(event) => {
                              this.setState({
                                ...this.state,
                                representative: event.target.value,
                              });
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="companyName" md={4}>
                          Company Name
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#4a6ddf",
                              color: "white",
                            }}
                            type="text"
                            id="companyName"
                            name="companyName"
                            placeholder={this.props.data.CompanyName}
                            onChange={(event) => {
                              this.setState({
                                ...this.state,
                                companyName: event.target.value,
                              });
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="designation" md={4}>
                          Designation
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#4a6ddf",
                              color: "white",
                            }}
                            type="text"
                            id="designation"
                            name="designation"
                            placeholder={this.props.data.Designation}
                            onChange={(event) => {
                              this.setState({
                                ...this.state,
                                designation: event.target.value,
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
                        <Label htmlFor="email" md={4}>
                          Address
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#4a6ddf",
                              color: "whiel",
                            }}
                            type="text"
                            id="email"
                            name="email"
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

export default EditCompany;
