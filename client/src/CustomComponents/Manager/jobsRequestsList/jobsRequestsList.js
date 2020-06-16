import React from "react";
import { Row, Col, Table, Button } from "reactstrap";

import Widget from "../../../components/Widget/Widget";
import s from "./jobsRequestsList.module.scss";
import axios from "axios";
import ViewJobRequest from "../viewJobRequest/viewJobRequest";
import AssignJob from "../assignJob/assignJob";

class JobsRequestsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requestDetails: [],
    };
  }
  componentDidMount() {
    axios
      .post("http://localhost:4000/manager/jobsrequestslist", {})
      .then((res) => {
        console.log(res.data);
        this.setState({ ...this.state, requestDetails: res.data });
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
                  List of all{" "}
                  <span className="fw-semi-bold">Jobs Requests</span>
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th>Title</th>
                    <th>Company Name</th>
                    <th>Required Staff</th>
                    <th className="hidden-sm-down">Date</th>
                    <th className="hidden-sm-down">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.requestDetails.map((row) => (
                    <tr key={row.id}>
                      <td>{row.Title}</td>
                      <td>{row.CompanyName}</td>
                      <td>{row.RequiredStaff}</td>
                      <td>{row.Date}</td>
                      <td className="text-muted">
                        <div className="row">
                          <ViewJobRequest {...this.props} data={row} />
                          <AssignJob {...this.props} data={row} />
                        </div>
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

export default JobsRequestsList;
