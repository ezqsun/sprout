import React from 'react'
import { Link } from "react-router-dom"
import PlantCard from './PlantCard'

export default class UserLocationPage extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        let plantCards = 
        <div className="plant-card--none-found">
            <h2>No plants in this location</h2>
        </div>
        if(this.props.currentCollectionPlants){
            plantCards = this.props.currentCollectionPlants.map(plants=>{
                return <PlantCard />

            })
        }


        return (
            <section className="location">
                <div className="location__header">
                    <h1 className="location__header__title">Your</h1>
                </div>
                <div className="location__plant-cards">
                    {plantCards}
                </div>
            </section>
    
        )
    }

}
