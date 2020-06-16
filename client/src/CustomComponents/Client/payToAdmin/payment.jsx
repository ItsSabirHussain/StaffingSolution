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
      jobtitle: "",
      jobid: "",
      date: Date,
      cardnumber: "",
      nameoncard: "",
      expiredate: Date,
      cvv: "",
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
      .post("http://localhost:4000/client/payment", {
        JobID: this.state.jobid,
        JobName: this.state.jobtitle,
        Amount: this.state.ammount,
        PaymentDate: this.state.date,
        ClientID: this.props.client._id,
        ClientName: this.props.client.Representative,
        CardNumber: this.state.cardnumber,
        CVV: this.state.cvv,
      })
      .then((res) => {
        alert("The payment has sent successfully. \n");
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
            <Widget title={<h4> Pay to Staff</h4>} close settings>
              <Row>
                <Col>
                  <Form onSubmit={this.handleSubmit}>
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
                      <Label htmlFor="cardnumber" md={2}>
                        Card Number
                      </Label>
                      <Col md={3}>
                        <Input
                          type="text"
                          id="cardnumber"
                          name="cardnumber"
                          placeholder="Card Number"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              cardnumber: e.target.value,
                            });
                          }}
                        />
                      </Col>
                      <Label htmlFor="nameoncard" md={{ size: 2, offset: 1 }}>
                        Card Holder's Name
                      </Label>
                      <Col md={3}>
                        <Input
                          type="text"
                          id="nameoncard"
                          name="nameoncard"
                          placeholder="Name on Card"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              nameoncard: e.target.value,
                            });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="cvv" md={2}>
                        CVV
                      </Label>
                      <Col md={3}>
                        <Input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="CVV"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              cvv: e.target.value,
                            });
                          }}
                        />
                      </Col>
                      <Label htmlFor="amount" md={{ size: 2, offset: 1 }}>
                        Ammount
                      </Label>
                      <Col md={3}>
                        <Input
                          type="text"
                          id="amount"
                          name="amount"
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
