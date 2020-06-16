import React from "react";
import { Row, Col, Table, Button } from "reactstrap";

import Widget from "../../../components/Widget/Widget";
import s from "./jobsRequestsList.module.scss";
import ViewCurrentJob from "../viewCurrentJob/viewCurrentJob";
import axios from "axios";

class CurrentJobs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobDetails: [],
    };
  }

  componentDidMount() {
    axios
      .post("http://localhost:4000/staff/currentjobs", {
        id: this.props.staff._id,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ ...this.state, jobDetails: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Jobs - <span className="fw-semi-bold">List</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  List of all <span className="fw-semi-bold">Current Jobs</span>
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th>Job Title</th>
                    <th>Company Name</th>
                    <th>Date</th>
                    <th className="hidden-sm-down">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.jobDetails.map((row) => (
                    <tr key={row.id}>
                      <td>{row.JobTitle}</td>
                      <td>{row.ClientName}</td>
                      <td>{row.Date.substring(0, 10)}</td>
                      <td className="text-muted">
                        <div className="row">
                          <ViewCurrentJob data={row} />
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
                <p>List of all Jobs </p>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CurrentJobs;
