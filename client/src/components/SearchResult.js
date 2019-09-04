import React from 'react'
import { formatTitle } from './utilities/formatString'


export default function SearchResult(props) {

    let image = ('image_url' in props.result) ?
        <div className="search__results-card__image"
            style={{ background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${`https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${props.result.image_url}`})`, backgroundSize: 'cover' }}>
        </div>
        :
        <div className="search__results-card__image"
            style={{ background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`, backgroundSize: 'cover' }}>
        </div>


    return (
        <div key={props.result.id} className="search__results-card">
            <span className="search__results-card__name">{props.result.name || formatTitle(props.result.common_name)}</span>
            {image}
        </div>
    )
}
