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
import { Form, FormGroup } from "reactstrap";

class ViewCurrentJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
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
          &nbsp; View
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader
            toggle={this.toggleModal}
            style={{ background: "#4a6ddf", color: "black" }}
          >
            <strong>
              <h3 className="display-5">Job Info</h3>
            </strong>
          </ModalHeader>
          <ModalBody style={{ background: "white", color: "black" }}>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup row>
                        <Label htmlFor="representatiev" md={3}>
                          Job ID
                        </Label>
                        <Label htmlFor="representative" md={9}>
                          <h4 className="display-6">{this.props.data.JobID}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="designation" md={3}>
                          Job Title
                        </Label>
                        <Label htmlFor="designation" md={9}>
                          <h4 className="display-6">
                            {this.props.data.JobTitle}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="companyname" md={3}>
                          Client ID
                        </Label>
                        <Label htmlFor="companyname" md={9}>
                          <h4 className="display-6">
                            {this.props.data.ClientID}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="date" md={3}>
                          Client Name
                        </Label>
                        <Label htmlFor="date" md={9}>
                          <h4 className="display-6">
                            {this.props.data.ClientName}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="phone" md={3}>
                          Date
                        </Label>
                        <Label htmlFor="phone" md={9}>
                          <h4 className="display-6">
                            {this.props.data.Date.substring(0, 10)}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="email" md={3}>
                          Days
                        </Label>
                        <Label htmlFor="email" md={9}>
                          <h4 className="display-6">{this.props.data.Days}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="checkin" md={3}>
                          Check In
                        </Label>
                        <Label htmlFor="checkin" md={9}>
                          <h4 className="display-6">
                            {this.props.data.CheckIn}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="checkout" md={3}>
                          Check Out
                        </Label>
                        <Label htmlFor="checkout" md={9}>
                          <h4 className="display-6">
                            {this.props.data.CheckOut}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="Work Detail" md={3}>
                          Work Detail
                        </Label>
                        <Label htmlFor="representative" md={9}>
                          <small> {this.props.data.Detail}</small>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={{ size: 10, offset: 3 }}>
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

export default ViewCurrentJob;
