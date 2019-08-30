import React from 'react'
import { Link } from "react-router-dom";

export default function LogIn() {
    return (
        <article className="login">
            <div className="login__background-top"></div>
            <div className="login__background-bottom"></div>

            <div className="login__content main-content">
                <section className="login__section">

                    <div className="login__section__title">
                        <h1>sprout</h1>
                    </div>

                    <section className="login__section__entry">
                        <form>
                            <input className="login__section__entry__input" placeholder="email"></input>
                            <input className="login__section__entry__input" placeholder="password"></input>
                        </form>

                        <div className="login__section__sign-in"><Link to="/user/garden"><span>Sign In</span></Link></div>
                        <div className="login__section__create-account"><Link to="/signup"><span>Create an account</span></Link></div>
                    </section>
                </section>
            </div>
        </article>
    )
}
