import React from 'react';
import '../styles/App.css';
import { Switch, Route } from "react-router-dom";
import LandingPage from './LandingPage'
import LogIn from './LogIn'
import UserGarden from './UserGarden'
import User from './User'
import Register from './Register'

function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LogIn} />
        <Route exact path="/user" component={User} />
        <Route path="/user/garden" component={UserGarden} />
        <Route path="/register" render={()=><Register submitRegister={props.submitRegister} registerRef={props.registerRef}/>} />
      </Switch>
    </div>
  );
}

export default App;
