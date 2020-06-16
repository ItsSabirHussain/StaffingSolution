import React from "react";
import { Row, Col, Table, Button } from "reactstrap";

import Widget from "../../../components/Widget/Widget";
import s from "./jobsRequestsList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import ViewStatus from "../../Client/viewStatus/viewStatus";
import axios from "axios";

class JobsStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jobStatusDetails: [],
    };
  }
  componentDidMount() {
    axios
      .post("http://localhost:4000/client/requeststatus", {
        ClientID: this.props.client._id,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ ...this.state, jobStatusDetails: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Jobs Status - <span className="fw-semi-bold">List</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  <span className="fw-semi-bold">Jobs Status</span>
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
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.jobStatusDetails.map((row) => (
                    <tr key={row._id}>
                      <td>{row.Title}</td>
                      <td>{row.Date}</td>
                      <td className="text-muted">
                        <div className="row">
                          <ViewStatus
                            {...this.props}
                            data={{
                              title: row.Title,
                              status: row.Status,
                              reason: row.Reason,
                            }}
                          />
                        </div>
                      </td>

                      <td>
                        <Button
                          color="default"
                          className="btn btn-light border border-dark"
                          onClick={(e) => {
                            axios
                              .post(
                                "http://localhost:4000/client/requestdelete",
                                {
                                  ClientID: this.props.client._id,
                                  id: row._id,
                                }
                              )
                              .then((res) => {
                                alert("Request has been deleted successfully.");
                                this.props.history.push(
                                  "/client/job/jobsstatus"
                                );
                              })
                              .catch((error) => {
                                alert(error);
                              });
                          }}
                        >
                          <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
                          &nbsp; Delete
                        </Button>
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
                <p>All job Status</p>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default JobsStatus;
