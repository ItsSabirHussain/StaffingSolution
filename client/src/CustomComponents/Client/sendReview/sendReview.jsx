import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Col, Row } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "../dashboard/Dashboard.module.scss";
import axios from "axios";

class SendReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      jobtitle: "",
      jobid: "",
      date: Date,
      phone: "",
      email: "",
      message: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
      .post("http://localhost:4000/client/sendreview", {
        JobID: this.state.jobid,
        JobName: this.state.jobtitle,
        ClientID: this.props.client._id,
        ClientName: this.props.client.ClientName,
        Message: this.state.message,
        Email: this.state.email,
        Phone: this.state.phone,
      })
      .then((res) => {
        alert("Review has sent successfully. \n");
        this.props.history.push("/client/payment");
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col lg={10}>
            <Widget title={<h4> Send Review</h4>} close settings>
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                      <Label htmlFor="name" md={2}>
                        Name
                      </Label>

                      <Col lg={10}>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Name"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              name: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="jobtitle" md={2}>
                        Job Title
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="jobtitle"
                          name="jobtitle"
                          placeholder="Job Title"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              jobtitle: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="jobid" md={2}>
                        Job ID
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="jobid"
                          name="jobid"
                          placeholder="Job ID"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              jobid: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="date" md={2}>
                        Date
                      </Label>
                      <Col md={10}>
                        <Input
                          type="date"
                          id="date"
                          name="date"
                          placeholder="Date"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              date: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="phone" md={2}>
                        Phone
                      </Label>
                      <Col md={5}>
                        <Input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="Phone"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              phone: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="email" md={2}>
                        Email
                      </Label>
                      <Col md={5}>
                        <Input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Email"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              email: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="message" md={2}>
                        Message
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="message"
                          name="message"
                          placeholder="Message"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              message: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={{ size: 10, offset: 2 }}>
                        <Button type="submit" color="primary">
                          Send Review
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SendReview;
