import React from 'react'

export default function ModalAddPlant(props) {
    return (
        <section className="add-plant" id="modal-add-plant">
            <div className="add-plant__content">
                <div className="add-plant__content__title">
                    <h1>Add this plant to your garden 🍃</h1>
                </div>
                <form className="add-plant__content__form" ref={props.addPlantRef}>
                    <input className="add-plant__content__form__input" name="plant-name" placeholder={`eg. ${props.plantName}`}></input>
                    <input className="add-plant__content__form__input" name="last-watered" title="date in yyyy-mm-dd format" placeholder="yyyy-mm-dd"></input>
                    <input className="add-plant__content__form__input" name="last-fertilized" placeholder="yyyy-mm-dd"></input>
                    <label>*if just purchased, please fill in with the purchase date</label>
                    <button className="add-plant__content__submit" onClick={(event)=>props.handleAddPlant(event, props.plantData.id)}>add</button>
                    <button className="add-plant__content__cancel" onClick={props.handleCloseModal}>cancel</button>
                </form>
            </div>
        </section>
    )
}
