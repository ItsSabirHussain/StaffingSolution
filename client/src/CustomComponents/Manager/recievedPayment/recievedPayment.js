import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "./recievedPaymentList.module.scss";
import ViewStaff from "../viewStaff/viewStaff";
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
      .post("http://localhost:4000/manager/recievedlist", {})
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
                    <th>Job Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.payments.map((row) => (
                    <tr key={row._id}>
                      <td className="text-muted">{row.JobID}</td>
                      <td className="text-muted">{row.JobName}</td>
                      <td className="text-muted">{row.Amount}</td>
                      <td className="text-muted">{row.PaymentDate}</td>
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
