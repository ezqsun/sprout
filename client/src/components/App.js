import React from 'react';
import '../styles/App.css';
import { Switch, Route } from "react-router-dom";
import LandingPage from './LandingPage'
import LogIn from './LogIn'
import UserGarden from './UserGarden'
import User from './User'
import Register from './Register'
import PlantInfo from './PlantInfo'
import UserLocationPage from './UserLocationPage'


function App(props) {
  let { userId, firstName, lastName, userName, email, userCollections, currentCollectionPlants, userPlants, userPlantsTrefleInfo } = props.state
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LogIn} />
        <Route exact path="/user" component={User} />
        <Route exact path="/user/garden" render={() =>
          <UserGarden userCollections={userCollections} userPlants={userPlants} updatePlantSchedule={props.updatePlantSchedule} userPlantsTrefleInfo={userPlantsTrefleInfo}/>} />
        <Route path="/register" render={() => <Register submitRegister={props.submitRegister} registerRef={props.registerRef} />} />
        <Route path="/user/garden/:plantId" render={({ match }) => 
          <PlantInfo plantId={match.params.plantId} userPlants={userPlants} userPlantsTrefleInfo={userPlantsTrefleInfo}/>
        } />
        {/* <Route path="/user/garden/:collectionId" render={({match})=><UserLocationPage collectionId={match} setPlants={props.setPlants} userPlants={userPlants}/>}/> */}
      </Switch>
    </div>
  );
}

export default App;
