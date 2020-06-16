import React from "react";
import { Row, Col } from "reactstrap";
import Widget from "../../components/Widget/Widget";
import s from "./Dashboard.module.scss";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      checkedArr: [false, false, false],
      userName: "Name of User",
    };
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
            <small>{this.state.userName}</small>
          </small>
        </h1>

        <Row>
          <Col lg={5}>
            {" "}
            <Widget title={<h5> Personal Information </h5>} close settings>
              <Row>
                <Col lg={4}>
                  <h5>Name:</h5>
                </Col>
                <Col lg={8}>
                  <h5>Name of user</h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5> ID:</h5>
                </Col>
                <Col lg={8}>
                  <h5>ID Number provided from </h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5>Phone</h5>
                </Col>
                <Col lg={8}>
                  <h5>+933339999339</h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5>Name:</h5>
                </Col>
                <Col lg={8}>
                  <h5>Name of user</h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5> ID:</h5>
                </Col>
                <Col lg={8}>
                  <h5>ID Number provided from </h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5>Phone</h5>
                </Col>
                <Col lg={8}>
                  <h5>+933339999339</h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5>Name:</h5>
                </Col>
                <Col lg={8}>
                  <h5>Name of user</h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5> ID:</h5>
                </Col>
                <Col lg={8}>
                  <h5>ID Number provided from </h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5>Phone</h5>
                </Col>
                <Col lg={8}>
                  <h5>+933339999339</h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5>Name:</h5>
                </Col>
                <Col lg={8}>
                  <h5>Name of user</h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5> ID:</h5>
                </Col>
                <Col lg={8}>
                  <h5>ID Number provided from </h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5>Phone</h5>
                </Col>
                <Col lg={8}>
                  <h5>+933339999339</h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5>Name:</h5>
                </Col>
                <Col lg={8}>
                  <h5>Name of user</h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5> ID:</h5>
                </Col>
                <Col lg={8}>
                  <h5>ID Number provided from </h5>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h5>Phone</h5>
                </Col>
                <Col lg={8}>
                  <h5>+933339999339</h5>
                </Col>
              </Row>
            </Widget>
          </Col>
          <Col lg={1} />
          <Col lg={4}>
            {" "}
            <Widget title={<h4> Notifications </h4>} close settings>
              <Row>
                <Col lg={1}></Col>
                <Col lg={10}></Col>
              </Row>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col lg={4} xs={12}></Col>

          <Col lg={4} xs={12}></Col>

          <Col lg={4} xs={12}></Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
