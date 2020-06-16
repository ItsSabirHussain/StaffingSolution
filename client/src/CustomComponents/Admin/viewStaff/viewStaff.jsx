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

class ViewStaff extends Component {
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
              <h3 className="display-5">Staff Info</h3>
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
                          <h4 className="display-6">{this.props.data.Name}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="specilisation" md={3}>
                          Specialisation
                        </Label>
                        <Label htmlFor="specilisation" md={9}>
                          <h4 className="display-6">
                            {this.props.data.Specialisation}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="address" md={3}>
                          Address
                        </Label>
                        <Label htmlFor="address" md={9}>
                          <h4 className="display-6">
                            {this.props.data.Address}
                          </h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="phone" md={3}>
                          Phone
                        </Label>
                        <Label htmlFor="phone" md={9}>
                          <h4 className="display-6">{this.props.data.Phone}</h4>
                        </Label>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor="email" md={3}>
                          Email
                        </Label>
                        <Label htmlFor="email" md={9}>
                          <h4 className="display-6">{this.props.data.Email}</h4>
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

export default ViewStaff;
