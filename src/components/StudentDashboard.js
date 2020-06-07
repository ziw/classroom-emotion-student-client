import React from 'react';
import RecordingWrapper from './recording/RecordingWrapper';
import ClassCard from './ClassCard';
import ClassStudentInfoHeaderCard from './StudentInfoHeader';
import { Space } from 'antd';
import './StudentDashboard.css'

function StudentDashboard() {
  return (
    <div className="student-dashboard">
      <Space direction="vertical">
        <ClassStudentInfoHeaderCard />
        <ClassCard />
        <RecordingWrapper />
      </Space>
    </div>
  );
}

export default StudentDashboard;