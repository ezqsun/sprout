import React from 'react'

export default function ModalAddPlant() {
    return (
        <section className="add-plant">
            <div className="add-plant__content">
                <div className="add-plant__content__title">
                    <h1>Add this plant to your garden 🍃</h1>
                </div>
                <form className="add-plant__content__form">
                    <input className="add-plant__content__form__input" name="plant-name" placeholder=""></input>
                    <label for="last-watered">*if just purchased, please fill in with the purchase date</label>
                    <input className="add-plant__content__form__input" name="last-watered" placeholder="yyyy-mm-dd"></input>
                    <input className="add-plant__content__form__input" name="last-fertilized" placeholder="yyyy-mm-dd"></input>
                </form>
                <button className="add-plant__content__submit">add</button>
                <button className="add-plant__content__cancel">cancel</button>
            </div>
        </section>
    )
}
