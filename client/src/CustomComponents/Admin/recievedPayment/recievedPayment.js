import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "./recievedPaymentList.module.scss";
import axios from "axios";
class PaymentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payments: [],
    };
  }
  componentDidMount() {
    axios
      .post("http://localhost:4000/admin/payments", {})
      .then((res) => {
        this.setState({ ...this.state, payments: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }
  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Payment List - <span className="fw-semi-bold">Recieved</span>
        </h2>
        <Widget
          title={
            <h5>
              List of all{" "}
              <span className="fw-semi-bold">Recieved Payments</span>
            </h5>
          }
          settings
          close
          bodyClass={s.mainTableWidget}
        >
          <Row>
            <Col xs={12}>
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th>Job ID</th>
                    <th>Job Title</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.payments.map((row) => (
                    <tr key={row._id}>
                      <td className="text-muted">{row.JobID}</td>
                      <td className="text-muted">{row.JobName}</td>
                      <td className="text-muted">{row.Amount}</td>
                      <td className="text-muted">
                        {row.PaymentDate.substring(0, 10)}
                      </td>
                      <Button
                        color="default"
                        className="mr-xs"
                        size="sm"
                        onClick={(e) => {
                          axios
                            .post("http://localhost:4000/admin/assignpayment", {
                              ID: row._id,
                            })
                            .then((res) => {
                              alert("Payment assigned successfully.");
                              this.props.history.push(
                                "/admin/receivedpayments"
                              );
                            })
                            .catch((error) => {
                              alert(error);
                            });
                        }}
                      >
                        Send to Manger
                      </Button>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearfix">
                <div className="float-right">
                  <Button color="default" className="mr-xs" size="sm">
                    Back
                  </Button>
                </div>
                <p>List of all Recieved Payments</p>
              </div>
            </Col>
          </Row>
        </Widget>
      </div>
    );
  }
}

export default PaymentList;
