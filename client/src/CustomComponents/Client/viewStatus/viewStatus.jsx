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

class ViewStatus extends Component {
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
          &nbsp; Status
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader
            toggle={this.toggleModal}
            style={{ background: "#4a6ddf", color: "black" }}
          >
            <strong>
              <h3 className="display-5">Status Info</h3>
            </strong>
          </ModalHeader>
          <ModalBody style={{ background: "white", color: "black" }}>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup row>
                        <Label htmlFor="title" md={3}>
                          Title
                        </Label>
                        <Label htmlFor="title" md={9}>
                          <h4 className="display-6">{this.props.data.title}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="status" md={3}>
                          Status
                        </Label>
                        <Label htmlFor="status" md={9}>
                          <h4 className="display-6">
                            {this.props.data.status}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="reason" md={3}>
                          Reason
                        </Label>
                        <Label htmlFor="reason" md={9}>
                          <h4 className="display-6">
                            {this.props.data.reason}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Col md={{ size: 10, offset: 3 }}>
                          <Button
                            type="submit"
                            color="primary"
                            onClick={(e) =>
                              this.props.history.push("/client/job/jobsstatus")
                            }
                          >
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

export default ViewStatus;
