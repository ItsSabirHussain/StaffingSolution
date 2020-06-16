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
import { Form, FormGroup, Input } from "reactstrap";
import axios from "axios";

class RejectJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      reason: "",
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
    e.preventDefault();
    axios
      .post("http://localhost:4000/admin/rejectjob", {
        id: this.props.data.id,
        rejectMessage: this.state.reason,
      })
      .then((res) => {
        this.setState({ ...this.state, requestDetails: res.data });
        alert("The request has been rejected successfully.");
        this.props.history.push("/admin/jobsrequestslist");
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
          &nbsp; Reject
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader
            toggle={this.toggleModal}
            style={{ background: "#3f66ff", color: "black" }}
          >
            <h4>Please enter reason of rejection.</h4>
          </ModalHeader>
          <ModalBody style={{ background: "white", color: "black" }}>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup row>
                        <Label htmlFor="reason" md={4}>
                          Reason of Rejection
                        </Label>
                        <Col lg={8}>
                          <Input
                            style={{
                              background: "#3f66ff",
                              color: "white",
                            }}
                            type="textblock"
                            id="reason"
                            name="reason"
                            placeholder="Reason"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={{ size: 10, offset: 4 }}>
                          <Button type="submit" color="primary">
                            Reject
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

export default RejectJob;
