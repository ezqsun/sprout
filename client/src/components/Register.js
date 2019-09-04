import React from 'react'
import { Link } from "react-router-dom";

export default function Register(props) {
    return (
        <article className="signup">
            <div className="signup__content main-content">
                <h1 className="signup__title">
                    Create an account
                </h1>
                <form className="signup__form" onSubmit={props.submitRegister}
            ref={props.registerRef}>
                    <input className="signup__form__input" name="firstName" placeholder="first name"></input>
                    <input className="signup__form__input" name="lastName" placeholder="last name"></input>
                    <input className="signup__form__input" name="email" placeholder="email"></input>
                    <input className="signup__form__input" name="userName" placeholder="choose an username"></input>
                    <input className="signup__form__input" name="password" placeholder="create a password"></input>
                    <button className="signup__submit">sign up</button>

                </form>
            </div>

        </article>
    )
}
