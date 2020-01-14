import React from 'react';
import './App.css';
import GuestLanding from './Components/GuestLanding/GuestLanding'
import TopBar from './Components/TopBar/TopBar'
import NotFound from './Components/Not Found/NotFound'
import TeacherHomePage from './Components/Teacher/TeacherHomePage/TeacherHomePage'
import StudentHomePage from './Components/Student/StudentHomePage/StudentHomePage'
import {Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Switch>
        <Route exact path='/' component={GuestLanding} />
        <Route  path='/teacher' component={TeacherHomePage} />
        <Route  path='/student' component={StudentHomePage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
