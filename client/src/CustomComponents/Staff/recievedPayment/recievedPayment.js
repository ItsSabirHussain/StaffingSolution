import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "./recievedPaymentList.module.scss";
import axios from "axios";
class PaymentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentList: [],
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:4000/staff/payments", {
        StaffID: this.props.staff._id,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ ...this.state, paymentList: res.data });
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
                  </tr>
                </thead>
                <tbody>
                  {this.state.paymentList.map((row) => (
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
