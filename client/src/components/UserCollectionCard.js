import React from 'react'

export default function UserCollectionCards(props) {
    return (
        <article className="collection-card">
            <div className="collection-card__content">
                <div className="collection-card__content-text">
                    <div className="collection-card__content__title">
                        <h2 className="collection-card__content__title-name">{props.location}</h2>
                    </div>
                </div>
            </div>
        </article>
    )
}
