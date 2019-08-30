import React from 'react'
import UserCollectionCard from './UserCollectionCard'
import { Link } from "react-router-dom";
import PlantCard from './PlantCard'

export default function UserGarden(props) {
    // let userCollectionCards = props.userCollections.map(collection=>{
    //     return <Link to={`/user/garden/${collection.id}`}><UserCollectionCard collection={collection} /></Link>

    // })

    let plantCards = 
    <div className="plant-card--none-found">
        <h2>No plants in your garden yet</h2>
    </div>
    if(props.userPlants){
        plantCards = props.userPlants.map(plant=>{
            return <PlantCard plant={plant}/>

        })
    }

    return (
        <article className="user-garden">
            <div className="user-garden__content main__content">
                <h1 className="user-garden__title">Your garden ✨</h1>
                <div className="user-garden__collections">
                    {/* {userCollectionCards} */}
                    {plantCards}

                </div>
            </div>
        </article>
    )
}
