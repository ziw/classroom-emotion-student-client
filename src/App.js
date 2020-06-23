import React from 'react';
import StudentDashboard from './components/StudentDashboard';
import './App.css';
import UserLogin from './components/UserLogin';
import { useRecoilValue } from 'recoil';
import { authState } from './utils';

function App() {
  const authenticated = useRecoilValue(authState);

  return (
    <div className="App">
      {
        authenticated ?
          <StudentDashboard /> :
          <UserLogin />
      }
    </div>
  );
}

export default App;
