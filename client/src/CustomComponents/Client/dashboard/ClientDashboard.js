import React from "react";
import { Row, Col } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import s from "./Dashboard.module.scss";

class ClientDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.checkTable = this.checkTable.bind(this);
  }

  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Welcome &nbsp;
          <small>
            <small>{this.props.client.Representative}</small>
          </small>
        </h1>

        <Row>
          <Col lg={5}>
            <Widget
              title={<h3 className="display-5"> Personal Information </h3>}
              close
              settings
            >
              <Row>
                <Col lg={4}>
                  <h3 className="display-5">Representative:</h3>
                </Col>
                <Col lg={8}>
                  <h3 className="display-5">
                    {this.props.client.Representative}
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h3 className="display-5">Designation</h3>
                </Col>
                <Col lg={8}>
                  <h3 className="display-5">{this.props.client.Designation}</h3>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h3 className="display-5">Address</h3>
                </Col>
                <Col lg={8}>
                  <h3 className="display-5">{this.props.client.Address}</h3>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h3 className="display-5">Phone:</h3>
                </Col>
                <Col lg={8}>
                  <h3 className="display-5">{this.props.client.Phone}</h3>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h3 className="display-5">CompanyName:</h3>
                </Col>
                <Col lg={8}>
                  <h3 className="display-5">{this.props.client.CompanyName}</h3>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h3 className="display-5">Email:</h3>
                </Col>
                <Col lg={8}>
                  <h3 className="display-5">{this.props.client.Email}</h3>
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <Col lg={4} xs={12}></Col>

          <Col lg={4} xs={12}></Col>

          <Col lg={4} xs={12}></Col>
        </Row>
      </div>
    );
  }
}

export default ClientDashboard;
