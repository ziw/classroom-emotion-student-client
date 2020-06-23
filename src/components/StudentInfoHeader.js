import React from 'react';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import { useRecoilValue } from 'recoil';
import './StudentInfoHeader.css';
import { authState } from '../utils';

function StudentInfoHeader() {

  const username = useRecoilValue(authState);

  return (
    <Row className="student-info-header">
      <Col span={12}>
        {username}
      </Col>
    </Row>
  )
}

export default StudentInfoHeader;