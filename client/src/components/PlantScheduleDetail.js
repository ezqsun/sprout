import React from 'react'
import sunIcon from '../assets/icons/svg/sun.svg'
import waterIcon from '../assets/icons/svg/drop.svg'
import soilIcon from '../assets/icons/svg/soil.svg'
import shadeIcon from '../assets/icons/svg/shade.svg'

export default function PlantScheduleDetail(props) {
    let icon
    let hoverText
    let category
    switch (props.detail) {
        case "sunlight":
            icon = sunIcon
            hoverText = "put in the sun"
            break
        case "shade":
            icon = shadeIcon
            hoverText = "put in the shade"
            break
        case "water":
            icon = waterIcon
            hoverText = "watered"
            category = "lastWatered"
            break
        case "soil":
            icon = soilIcon
            hoverText = "added fertilizer"
            category = "lastFertilized"
            break

    }

    let daysUntil = (props.content >= 7) ?
        <div className="schedule-detail__text--red">
            <span className="schedule-detail__text__days-until">{props.content}</span>
            {/* <div className="schedule-detail__hover-text" onClick={(event) => props.updatePlantSchedule(event, props.id, category)}>
                <span>+ {hoverText} today</span>
            </div> */}
        </div>
        :
        <div className="schedule-detail__text">
            <span className="schedule-detail__text__days-until">{props.content}</span>
            {/* <div className="schedule-detail__hover-text" onClick={(event) => props.updatePlantSchedule(event, props.id, category)}>
                <span>+ {hoverText} today</span>
            </div> */}
        </div>

    return (
        <section className="schedule-detail">
            <img className="schedule-detail__icon" src={icon} alt=""></img>
            <div className="schedule-detail__icon__separator">
                {daysUntil}
            </div>
        </section>
    )
}
