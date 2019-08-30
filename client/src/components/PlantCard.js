import React from 'react'
import PlantScheduleDetail from './PlantScheduleDetail'
import plantImg from '../assets/images/plant1.jpg'

export default function PlantCard(props) {
    return (
        <article className="plant-card">
            <div className="plant-card__content">
                <div className="plant-card__content-text">
                    <div className="plant-card__content__title">
                        <h2 className="plant-name">Dave</h2>
                        <span className="plant-common-name">Rattlesnake plant</span>
                    </div>
                    <section className="plant-schedule">
                        <PlantScheduleDetail detail="water" content="3"/>
                        <PlantScheduleDetail detail="soil" content="T"/>

                    </section>
                </div>
            </div>

            <img className="plant-card__image" src={plantImg} alt=""></img>
        </article>
    )
}
