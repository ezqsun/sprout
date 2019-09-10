import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar(props) {
    return props.isLoggedIn || props.userName.length ?
        <section className="navbar">
            <div className="navbar__content">
                <div className="navbar__content__logo">
                    <Link to="/">sprout</Link>
                </div>
                <div className="navbar__content__links">
                    <Link to="/user/garden"><div className="navbar__content__links__link">garden</div></Link>
                    <Link to="/search"><div className="navbar__content__links__link">search</div></Link>
                    <Link to="/user"><div className="navbar__content__links__link">profile</div></Link>
                </div>
            </div>
        </section>
        :
        <section className="navbar">
            <div className="navbar__content">
                <div className="navbar__content__logo">
                    <Link to="/">sprout</Link>
                </div>
            </div>
        </section>
}
