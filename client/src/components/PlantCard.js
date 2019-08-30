import React from 'react'
import PlantScheduleDetail from './PlantScheduleDetail'
import plantImg from '../assets/images/plant1.jpg'
import daysSince from './utilities/daysSince'

export default function PlantCard(props) {
    let { name, trefleReferenceId, lastWatered, lastFertilized, trefleData } = props.plant

    // let daysSinceWater = daysSince(lastWatered)
    // let daysSinceFertilize = daysSince(lastFertilized)

    console.log(lastFertilized)
    let daysSinceWater = daysSince(lastWatered)
    let daysSinceFertilize = daysSince(lastFertilized)




    return (
        <article className="plant-card">
            <div className="plant-card__content">
                <div className="plant-card__content-text">
                    <div className="plant-card__content__title">
                        <h2 className="plant-name">{name}</h2>
                        <span className="plant-common-name">{trefleData.common_name}</span>
                    </div>
                    <section className="plant-schedule">
                        <PlantScheduleDetail detail="water" content={daysSinceWater} />
                        <PlantScheduleDetail detail="soil" content={daysSinceFertilize} />

                    </section>
                </div>
            </div>

            <img className="plant-card__image" src={plantImg} alt=""></img>
        </article>
    )
}


