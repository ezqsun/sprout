import React from 'react'
import { Link } from "react-router-dom";
import PlantCard from './PlantCard'

export default function UserGarden(props) {
    return (
        <article className="user-garden">
            <div className="user-garden__content main__content">
                <h1 className="user-garden__title">Your garden ✨</h1>
                <div className="user-garden__plant-cards">
                    <PlantCard />
                    <PlantCard />
                    <PlantCard />
                </div>
            </div>
        </article>
    )
}
