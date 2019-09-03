import React from 'react'

export default function ModalAddPlant(props) {
    return (
        <section className="add-plant">
            <div className="add-plant__content">
                <div className="add-plant__content__title">
                    <h1>Add this plant to your garden 🍃</h1>
                </div>
                <form className="add-plant__content__form" ref={props.addPlantRef}>
                    <input className="add-plant__content__form__input" name="plant-name" placeholder={`eg. ${props.plantName}`}></input>
                    <label htmlFor="last-watered">*if just purchased, please fill in with the purchase date</label>
                    <input className="add-plant__content__form__input" name="last-watered" placeholder="yyyy-mm-dd"></input>
                    <input className="add-plant__content__form__input" name="last-fertilized" placeholder="yyyy-mm-dd"></input>
                    <button className="add-plant__content__submit" onClick={(event)=>props.handleAddPlant(event, props.plantData.id)}>add</button>
                    <button className="add-plant__content__cancel" onClick={props.handleCancelForm}>cancel</button>
                </form>
            </div>
        </section>
    )
}
