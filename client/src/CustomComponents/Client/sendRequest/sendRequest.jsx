import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
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

class SendRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      jobDetails: "",
      requiredStaff: "",
      requiredDays: "",
      requiredHours: "",
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
      .post("http://localhost:4000/client/sendrequest", {
        Title: this.state.title,
        Detail: this.state.jobDetails,
        RequiredStaff: this.state.requiredStaff,
        RequiredDays: this.state.requiredDays,
        RequiredTime: this.state.requiredHours,
        ClientID: this.props.client._id,
        companyName: this.props.client.CompanyName,
      })
      .then((res) => {
        this.setState({ ...this.state, client: res.data });
        alert("Job request has been sent.\n");
        this.props.history.push("/client/job/sendrequest");
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
            <Widget title={<h4> Enter Job Details</h4>} close settings>
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                      <Label htmlFor="title" md={2}>
                        Title
                      </Label>

                      <Col lg={10}>
                        <Input
                          type="text"
                          id="title"
                          name="tile"
                          placeholder="Title"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              title: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="Job Details" md={2}>
                        Job Details
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="jobdetails"
                          name="jobDetails"
                          placeholder="Job Details"
                          value={this.state.jobDetails}
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              jobDetails: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="requiredStaff" md={2}>
                        Rquired Staff
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="requiredStaff"
                          name="requiredStaff"
                          placeholder="Required Staff"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              requiredStaff: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="requiredDtays" md={2}>
                        Required Days
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="requiredDays"
                          name="requiredDays"
                          placeholder="Required Days"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              requiredDays: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="requiredHours" md={2}>
                        Hours Per Day
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          id="requiredHours"
                          name="requiredHours"
                          placeholder="Required Hours Per Day"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              requiredHours: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={{ size: 10, offset: 2 }}>
                        <Button type="submit" color="primary">
                          Send Request
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

export default SendRequest;
