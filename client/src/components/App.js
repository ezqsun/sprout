import React from 'react';
import '../styles/App.css';
import { Switch, Route } from "react-router-dom";
import LandingPage from './LandingPage'
import LogIn from './LogIn'
import UserGarden from './UserGarden'
import User from './User'
import Register from './Register'
import PlantInfo from './PlantInfo'
import Search from './Search'
import Navbar from './Navbar'
import UserLocationPage from './UserLocationPage'


function App(props) {
  let { userId, firstName, lastName, userName, email, userCollections, currentCollectionPlants, userPlants, userPlantsInfo, searchResults, currPlant, currSearchResult } = props.state
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" 
        // component={LandingPage} 
        render={(p) => <LogIn handleLogin={props.handleLogin} history={p.history}/>}/>
        <Route path="/login" render={(p) => <LogIn handleLogin={props.handleLogin} history={p.history}/>} />
        <Route exact path="/user" render={() => <User userId={userId} firstName={firstName} lastName={lastName} userName={userName} email={email} handleUpdateUser={props.handleUpdateUser} updateUserRef={props.updateUserRef} />} />
        <Route exact path="/user/garden" render={() =>
          <UserGarden userCollections={userCollections} userPlants={userPlants} updatePlantSchedule={props.updatePlantSchedule} userPlantsInfo={userPlantsInfo} />} />
        <Route exact path="/login/user/garden" render={(p) =>
          <UserGarden history={p.history} userCollections={userCollections} userPlants={userPlants} updatePlantSchedule={props.updatePlantSchedule} userPlantsInfo={userPlantsInfo} />} />
        <Route path="/register" render={(p) => <Register submitRegister={props.submitRegister} registerRef={props.registerRef} history={p.history}/>} />
        <Route path="/user/garden/:plantId" render={({ match }) =>
          <PlantInfo
            plantId={match.params.plantId}
            userPlants={userPlants}
            userPlantsInfo={userPlantsInfo}
            currPlant={currPlant}
            handleSelectPlantInfo={props.handleSelectPlantInfo}
            handleRemovePlant={props.handleRemovePlant}
          />
        } />

        <Route path="/search/:plantId" render={p =>
          <PlantInfo
            plantId={p.match.params.plantId}
            userPlants={userPlants}
            userPlantsInfo={userPlantsInfo}
            currPlant={currPlant}
            handleSelectPlantInfo={props.handleSelectPlantInfo}
            searchResults={searchResults}
            handleAddPlant={props.handleAddPlant}
            handleCancelForm={props.handleCancelForm}
            addPlantRef={props.addPlantRef} 
            history={p.history}/>
        } />
        <Route exact path="/search" render={() => <Search handleSearchForPlant={props.handleSearchForPlant} searchResults={searchResults} searchRef={props.searchRef} />} />
        {/* <Route path="/user/garden/:collectionId" render={({match})=><UserLocationPage collectionId={match} setPlants={props.setPlants} userPlants={userPlants}/>}/> */}
      </Switch>
    </div>
  );
}

export default App;
