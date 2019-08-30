import React from 'react'
import { Link } from "react-router-dom";

export default function User() {
    return (
        <section className='user-page'>
            <div className="user-page__header">
                <h1 className="user-page__header__title">Your account info</h1>
            </div>
            <Link to="/user/garden"><button>Your Garden</button></Link>
            
        </section>
    )
}
