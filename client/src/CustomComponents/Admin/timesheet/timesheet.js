import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import axios from "axios";
import Widget from "../../../components/Widget/Widget";
import s from "./timesheet.module.scss";

class TimeSheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timesheet: [],
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:4000/admin/timesheet", {})
      .then((res) => {
        console.log("Her");
        console.log(res);
        this.setState({ ...this.state, timesheet: res.data });
      })
      .catch((error) => {
        alert(error);
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
      <div className={s.root}>
        <h2 className="page-title">
          Jobs Request - <span className="fw-semi-bold">List</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  TimeSheet <span className="fw-semi-bold">of Staff</span>
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
                    <th>Job Title</th>
                    <th>Days</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Staff</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.timesheet.map((row) => (
                    <tr key={row._id}>
                      <td>{row.ClientName}</td>
                      <td>{row.JobTitle}</td>
                      <td>{row.Days}</td>
                      <td>{row.CheckIn}</td>
                      <td>{row.CheckOut}</td>
                      <td>
                        <Table striped>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>ID</th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.Staff.map((ee) => {
                              return (
                                <tr>
                                  <td>{ee.Name}</td>
                                  <td>{ee.ID}</td>
                                </tr>
                              );
                            })}
                            <tr></tr>
                          </tbody>
                        </Table>
                      </td>
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
                <p>List of all Jobs Requests</p>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TimeSheet;
