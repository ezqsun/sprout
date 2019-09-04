import React from 'react'
import { formatTitle } from './utilities/formatString'


export default function PlantInfoDetail(props) {
    return (
        <div name={props.title} className="plant-info__details__category">
            <div className="plant-info__details__category-title">
                <span>{formatTitle(props.title)} </span>
            </div>
            <div className="plant-info__details__category-content">
                <span >{props.value}</span>
            </div>
        </div>
    )
}
