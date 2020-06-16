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

class AssignJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      availableStaff: [],
      staff: [],
      checkin: "",
      checkout: "",
      days: "",
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
  componentDidMount() {
    axios
      .post("http://localhost:4000/manager/stafflist", {})
      .then((res) => {
        console.log(res.data);
        this.setState({ ...this.state, availableStaff: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/manager/assignjob", {
        JobID: this.props.data._id,
        JobTitle: this.props.data.Title,
        ClientID: this.props.data.ClientID,
        ClientName: this.props.data.CompanyName,
        CheckIn: this.state.checkin,
        CheckOut: this.state.checkout,
        Days: this.state.days,
        Staff: this.state.staff,
        Detail: this.props.data.Detail,
      })
      .then((res) => {
        alert("The job has been assigned successfully.");
        this.props.history.push("/manager/jobsrequests");
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
          &nbsp; Assign
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader
            toggle={this.toggleModal}
            style={{ background: "#4a6ddf", color: "white" }}
          >
            <h4>Select Staff</h4>
          </ModalHeader>
          <ModalBody style={{ background: "white", color: "black" }}>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup row>
                        <Label htmlFor="selectstaff" md={4}>
                          Select Staff
                        </Label>
                        <Col lg={8}>
                          <Input
                            multiple
                            type="select"
                            id="class"
                            name="class"
                            onChange={(e) => {
                              var options = e.target.options;
                              var value = [];
                              for (var i = 0, l = options.length; i < l; i++) {
                                if (options[i].selected) {
                                  console.log(options[i].name);
                                  value.push({
                                    ID: options[i].value,
                                    Name: options[i].label,
                                  });
                                }
                              }
                              console.log(value);

                              this.setState({
                                ...this.state,
                                staff: value,
                              });
                            }}
                          >
                            {this.state.availableStaff.map((e) => {
                              return (
                                <option value={e._id} label={e.Name}>
                                  {e._id + "   (" + e.Name + ")"}
                                </option>
                              );
                            })}
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="checkin" md={4}>
                          Check In
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#4a6ddf",
                              color: "white",
                            }}
                            type="time"
                            id="checkin"
                            name="checkin"
                            onChange={(event) => {
                              this.setState({
                                ...this.state,
                                checkin: event.target.value,
                              });
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="checkout" md={4}>
                          Check Out
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#4a6ddf",
                              color: "white",
                            }}
                            type="time"
                            id="checkout"
                            name="checkout"
                            onChange={(event) => {
                              this.setState({
                                ...this.state,
                                checkout: event.target.value,
                              });
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="days" md={4}>
                          Days
                        </Label>
                        <Col md={8}>
                          <Input
                            style={{
                              background: "#4a6ddf",
                              color: "white",
                            }}
                            type="text"
                            id="days"
                            name="days"
                            onChange={(event) => {
                              this.setState({
                                ...this.state,
                                days: event.target.value,
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

export default AssignJob;
