import React from 'react'
import UserCollectionCard from './UserCollectionCard'
import { Link } from "react-router-dom";
import PlantCard from './PlantCard'

export default function UserGarden(props) {
    // let userCollectionCards = props.userCollections.map(collection=>{
    //     return <Link to={`/user/garden/${collection.id}`}><UserCollectionCard collection={collection} /></Link>

    // })
    let {userCollections, userPlants, updatePlantSchedule, userPlantsTrefleInfo} = props

    let plantCards = 
    <div className="plant-card--none-found">
        <h2>No plants in your garden yet</h2>
    </div>
    if((Array.isArray(userPlants) && userPlants.length) && (Array.isArray(userPlantsTrefleInfo) && userPlantsTrefleInfo.length)){
        plantCards = userPlants.map(plant => {
            let trefleData = userPlantsTrefleInfo.find(treflePlant =>{
                return treflePlant.id === plant.trefleReferenceId
            })
            return <PlantCard plant={plant} key={plant.id} updatePlantSchedule={props.updatePlantSchedule} trefleData={trefleData}/>
        });
    }

    return (
        <article className="user-garden">
            <div className="user-garden__content main__content">
                <div className="user-garden__title">
                    <img className="user-garden__title-back" src ="" alt=""></img>
                <h1 className="user-garden__title-text">Your garden ✨</h1>
                </div>
                <div className="user-garden__collections">
                    {/* {userCollectionCards} */}
                    {plantCards}

                </div>
            </div>
        </article>
    )
}
