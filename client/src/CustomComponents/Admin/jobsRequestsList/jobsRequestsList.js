import React from "react";
import { Row, Col, Table, Button } from "reactstrap";

import Widget from "../../../components/Widget/Widget";
import s from "./jobsRequestsList.module.scss";
import RejectJob from "../rejectJob/rejectJob";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import ViewJobRequest from "../viewJobRequest/viewJobRequest";
import axios from "axios";

class JobsRequestsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requestDetails: [],
    };
  }
  componentDidMount() {
    axios
      .post("http://localhost:4000/admin/jobsrequestslist", {})
      .then((res) => {
        console.log(res.data);
        this.setState({ ...this.state, requestDetails: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }
  parseDate(date) {
    this.dateSet = date.split(" ");

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
                    <th>ClientID</th>
                    <th>Company Name</th>
                    <th>Required Staff</th>
                    <th className="hidden-sm-down">Date</th>
                    <th className="hidden-sm-down">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.requestDetails.map((row) => (
                    <tr key={row._id}>
                      <td>{row.ClientID}</td>
                      <td>{row.CompanyName}</td>
                      <td>{row.RequiredStaff}</td>
                      <td>{row.Date}</td>
                      <td className="text-muted">
                        <div className="row">
                          <ViewJobRequest data={row} />
                          <RejectJob {...this.props} data={{ id: row._id }} />
                          <Button
                            color="default"
                            className="btn btn-light border border-dark"
                            onClick={() => {
                              console.log(row._id);
                              axios
                                .post("http://localhost:4000/admin/assignjob", {
                                  jobID: row._id,
                                })
                                .then((res) => {
                                  console.log(res.data);
                                  alert("Successfully Assigned");
                                  this.props.history.push(
                                    "/admin/jobsrequestslist"
                                  );
                                })
                                .catch((error) => {
                                  alert(error);
                                });
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faPencilAlt}
                            ></FontAwesomeIcon>
                            &nbsp; Assign
                          </Button>
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
