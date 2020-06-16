import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import axios from "axios";
import Widget from "../../../components/Widget/Widget";
import s from "./attendance.module.scss";

class Attendance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attendance: [],
    };
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
  }
  componentDidMount() {
    axios
      .post("http://localhost:4000/manager/attendance", {})
      .then((res) => {
        this.setState({ ...this.state, attendance: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }
  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Staff - <span className="fw-semi-bold">Attendance</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  List of all{" "}
                  <span className="fw-semi-bold">Attendance of Staff</span>
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th>Name</th>
                    <th>ID</th>
                    <th>Job Name</th>
                    <th className="hidden-sm-down">Date</th>
                    <th className="hidden-sm-down">Check In</th>
                    <th className="hidden-sm-down">Check Out</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.attendance.map((row) => (
                    <tr key={row.id}>
                      <td>{row.StaffName}</td>
                      <td>{row.StaffID}</td>
                      <td>{row.JobName}</td>
                      <td>{row.Date}</td>
                      <td>{row.CheckIn}</td>
                      <td>{row.CheckOut}</td>
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
                <p>List of staff attendance</p>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Attendance;
