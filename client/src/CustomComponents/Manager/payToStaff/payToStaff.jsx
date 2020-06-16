import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormFeedback,
} from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "../dashboard/Dashboard.module.scss";
import axios from "axios";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffid: "",
      staffname: "",
      jobtitle: "",
      jobid: "",
      ammount: "",
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
      .post("http://localhost:4000/manager/payment", {
        JobID: this.state.jobid,
        JobName: this.state.jobtitle,
        Amount: this.state.ammount,
        StaffID: this.state.staffid,
        StaffName: this.state.staffname,
      })
      .then((res) => {
        alert("The payment has sent successfully. \n");
        this.props.history.push("/manager/staff/payment");
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
            <Widget title={<h4> Pay to Staff</h4>} close settings>
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                      <Label htmlFor="name" md={2}>
                        Staff ID
                      </Label>

                      <Col lg={10}>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Staff ID"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              staffid: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label htmlFor="name" md={2}>
                        Staff Name
                      </Label>

                      <Col lg={10}>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Staff Name"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              staffname: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="jobtitle" md={2}>
                        Job ID
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="jobtitle"
                          name="jobtitle"
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
                      <Label htmlFor="jobid" md={2}>
                        Job Title
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="jobid"
                          name="jobid"
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
                        Amount
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="jobid"
                          name="jobid"
                          placeholder="Amount"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              ammount: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={{ size: 10, offset: 2 }}>
                        <Button type="submit" color="primary">
                          Send Payment
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

export default Payment;
