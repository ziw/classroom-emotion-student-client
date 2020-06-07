import React from 'react';
import { Row, Col } from 'antd';
import './StudentInfoHeader.css';

function StudentInfoHeader() {
  //TODO Implement Header
  return (
    <Row className="student-info-header">
      <Col span={12}>
        Student Name
      </Col>
      <Col span={12}>
        Menu
      </Col>
    </Row>
  )
}

export default StudentInfoHeader;