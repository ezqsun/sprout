import React from 'react'
import PlantScheduleDetail from './PlantScheduleDetail'
import daysSince from './utilities/daysSince'

export default function PlantCard(props) {
    let { name, lastWatered, lastFertilized, id, trefleReferenceId } = props.plant
    let { common_name, growth, scientific_name, images } = props.trefleData

    let daysSinceWater = daysSince(lastWatered)
    let daysSinceFertilize = daysSince(lastFertilized)

    return (
        <article className="plant-card">
            <div className="plant-card__content">
                <div className="plant-card__content-text">
                    <div className="plant-card__content__title">
                        <h2 className="plant-name">{name}</h2>
                        <span className="plant-common-name">{common_name || props.trefleData.name}</span>
                    </div>
                    <section className="plant-schedule">
                        <PlantScheduleDetail detail="water" content={daysSinceWater} id={id} updatePlantSchedule={props.updatePlantSchedule} />
                        <PlantScheduleDetail detail="soil" content={daysSinceFertilize} id={id} updatePlantSchedule={props.updatePlantSchedule} />
                    </section>
                </div>
                <div className="plant-card__image" style={{ background: `url(${`https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${props.trefleData.image_url}`})`, backgroundSize: 'cover' }}>
                </div>
            </div>
        </article>
    )
}


