import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "./staffList.module.scss";
import ViewStaff from "../viewStaff/viewStaff";
import axios from "axios";
class StaffList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: [],
    };
  }
  componentDidMount() {
    axios
      .post("http://localhost:4000/manager/stafflist", {})
      .then((res) => {
        this.setState({ ...this.state, staffs: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }
  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Staff - <span className="fw-semi-bold">List</span>
        </h2>
        <Widget
          title={
            <h5>
              List of all <span className="fw-semi-bold">Staff</span>
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
                    <th>Name</th>
                    <th>Specialisation</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.staffs.map((row) => (
                    <tr key={row.id}>
                      <td className="text-muted">{row.Name}</td>
                      <td className="text-muted">{row.Specialisation}</td>
                      <td className="text-muted">{row.Address}</td>
                      <td className="text-muted">{row.Phone}</td>
                      <td className="text-muted">{row.Email}</td>

                      <td className="text-muted">
                        <div className="row">
                          <ViewStaff {...this.props} data={row} />
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
                <p>List of all Student</p>
              </div>
            </Col>
          </Row>
        </Widget>
      </div>
    );
  }
}

export default StaffList;
