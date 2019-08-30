import React from 'react'
import sunIcon from '../assets/icons/svg/sun.svg'
import waterIcon from '../assets/icons/svg/drop.svg'
import soilIcon from '../assets/icons/svg/soil.svg'
import shadeIcon from '../assets/icons/svg/shade.svg'

export default function PlantScheduleDetail(props) {
    let icon
    switch (props.detail) {
        case "sunlight":
            icon = sunIcon
            break
        case "shade":
            icon = shadeIcon
            break
        case "water":
            icon = waterIcon
            break
        case "soil":
            icon = soilIcon
            break

    }

    let daysUntil = (props.content === "T") ?
        <div className="schedule-detail__text--red">
            <span className="schedule-detail__text__days-until">{props.content}</span>
        </div>
        :
        <div className="schedule-detail__text">
            <span className="schedule-detail__text__days-until">{props.content}</span>
        </div>

    return (
        <section className="schedule-detail">
            <img className="schedule-detail__icon" src={icon} alt=""></img>
            {daysUntil}
        </section>
    )
}
