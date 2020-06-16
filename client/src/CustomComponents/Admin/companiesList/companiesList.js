import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "./companiesList.module.scss";
import EditCompany from "../editCompany/editCompany";
import ViewCompnay from "../viewComapny/viewCompany";
import axios from "axios";

class CompaniesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
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
      .post("http://localhost:4000/admin/companieslist", {})
      .then((res) => {
        console.log("Her");
        console.log(res);
        this.setState({ ...this.state, companies: res.data });
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Companies - <span className="fw-semi-bold">List</span>
        </h2>
        <Widget
          title={
            <h5>
              List of all <span className="fw-semi-bold">Commpanies</span>
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
                    <th>Company Name</th>
                    <th>Representative</th>
                    <th>Designation</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.companies.map((row) => (
                    <tr key={row.id}>
                      <td className="text-muted">{row.CompanyName}</td>
                      <td className="text-muted">{row.Representative}</td>
                      <td className="text-muted">{row.Designation}</td>
                      <td className="text-muted">{row.Address}</td>
                      <td className="text-muted">{row.Phone}</td>
                      <td className="text-muted">{row.Email}</td>

                      <td className="text-muted">
                        <div className="row">
                          <EditCompany {...this.props} data={row} />
                          <ViewCompnay {...this.props} data={row} />
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

export default CompaniesList;
