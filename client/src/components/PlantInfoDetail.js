import React from 'react'
import {formatTitle} from './utilities/formatString'


export default function PlantInfoDetail(props) {
    return (
        <div name={props.title} className="plant-info__details__category">
            <span className="plant-info__details__category-title">{formatTitle(props.title)} </span>
            <span className="plant-info__details__category-value">{props.value}</span>
        </div>
    )
}
