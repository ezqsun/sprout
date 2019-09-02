import React from 'react'
import UserCollectionCard from './UserCollectionCard'
import { Link } from "react-router-dom";
import PlantCard from './PlantCard'

export default function UserGarden(props) {
    // let userCollectionCards = props.userCollections.map(collection=>{
    //     return <Link to={`/user/garden/${collection.id}`}><UserCollectionCard collection={collection} /></Link>

    // })
    let { userCollections, userPlants, updatePlantSchedule, userPlantsInfo, handleSelectPlantInfo } = props

    let plantCards =
        <div className="plant-card--none-found">
            <h2>No plants in your garden yet</h2>
        </div>
    if ((Array.isArray(userPlants) && userPlants.length) && (Array.isArray(userPlantsInfo) && userPlantsInfo.length)) {
        plantCards = userPlants.map(plant => {
            let trefleData = userPlantsInfo.find(treflePlant => {
                return treflePlant.id === plant.trefleReferenceId
            })
            return <Link to={`/user/garden/${plant.id}`} ><PlantCard plant={plant} key={plant.id} updatePlantSchedule={props.updatePlantSchedule} trefleData={trefleData} /></Link>
        });
    }

    let backArrow =
        <svg onClick={()=> window.history.back()} width="13px" height="25px" viewBox="0 0 13 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>Icon-back-arrow</title>
            <g id="22.-InStock-Icons" transform="translate(-1221.000000, -364.000000)" fillRule="nonzero" stroke="#bfbfbf" strokeWidth="3">
                <g id="Icon-back-arrow" transform="translate(1228.000000, 376.500000) scale(-1, 1) translate(-1228.000000, -376.500000) translate(1221.000000, 365.000000)">
                    <path d="M1.0753788,7.06066017 L15.2071068,7.41421356" id="Line" transform="translate(7.707107, 6.914214) scale(-1, -1) rotate(45.000000) translate(-7.707107, -6.914214) "></path>
                    <path d="M0.221825407,16.5857864 L14.3535534,16.9393398" id="Line" transform="translate(7.353553, 16.439340) scale(-1, 1) rotate(45.000000) translate(-7.353553, -16.439340) "></path>
                </g>
            </g>
        </svg>

    return (
        <article className="user-garden">
            <div className="user-garden__content main__content">
                <div className="user-garden__title">
                    {backArrow}
                    <h1 className="user-garden__title-text">Your garden ✨</h1>
                </div>
                <div className="user-garden__collections">
                    {/* {userCollectionCards} */}
                    {plantCards}

                </div>
            </div>
        </article >
    )
}
