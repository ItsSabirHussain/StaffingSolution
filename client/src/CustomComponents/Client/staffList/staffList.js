import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "./jobsRequestsList.module.scss";
import ViewStaff from "../viewStaff/viewStaff";
import axios from "axios";

class StaffList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      staffDetails: [],
    };
  }
  componentDidMount() {
    axios
      .post("http://localhost:4000/client/staffdetails", {
        ClientID: this.props.client._id,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ ...this.state, staffDetails: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Staff Details - <span className="fw-semi-bold">List</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                  <span className="fw-semi-bold">Staff Details</span>
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
                    <th>Job ID</th>
                    <th>CheckIn</th>
                    <th>Job Out</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.staffDetails.map((row) => (
                    <tr key={row._id}>
                      <td>{row.JobTitle}</td>
                      <td>{row.JobID}</td>
                      <td>{row.CheckIn}</td>
                      <td>{row.CheckOut}</td>
                      <td className="text-muted">
                        <div className="row">
                          <ViewStaff {...this.props} data={row.Staff} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="clearfix">
                <div className="float-right"></div>
                <p>List of Jobs with Staff Details</p>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default StaffList;
