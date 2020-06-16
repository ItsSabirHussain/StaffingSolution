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

class ViewJobRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.parseDate = this.parseDate.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
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
                          Title
                        </Label>
                        <Label htmlFor="representative" md={9}>
                          <h4 className="display-6">{this.props.data.Title}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="companyname" md={3}>
                          Copmany Name
                        </Label>
                        <Label htmlFor="companyname" md={9}>
                          <h4 className="display-6">
                            {this.props.data.CompanyName}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="date" md={3}>
                          Date
                        </Label>
                        <Label htmlFor="date" md={9}>
                          <h4 className="display-6">{this.props.data.Date}</h4>
                        </Label>
                      </FormGroup>

                      <FormGroup row>
                        <Label htmlFor="days" md={3}>
                          Days
                        </Label>
                        <Label htmlFor="days" md={9}>
                          <h4 className="display-6">
                            {this.props.data.RequiredDays}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="requiredStaff" md={3}>
                          RequiredStaff
                        </Label>
                        <Label htmlFor="requiredStaff" md={9}>
                          <h4 className="display-6">
                            {this.props.data.RequiredStaff}
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

export default ViewJobRequest;
