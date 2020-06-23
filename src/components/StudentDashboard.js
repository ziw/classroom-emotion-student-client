import React from 'react';
import RecordingWrapper from './recording/RecordingWrapper';
import ClassCard from './ClassCard';
import { Space } from 'antd';
import './StudentDashboard.css'
import { useRecoilValue } from 'recoil';
import { authState } from '../utils';

function StudentDashboard() {

  const username = useRecoilValue(authState);

  return (
    <div className="student-dashboard">
      <Space direction="vertical">
        {/* <ClassStudentInfoHeaderCard /> */}
        <ClassCard />
        <RecordingWrapper username={username} />
      </Space>
    </div>
  );
}

export default StudentDashboard;