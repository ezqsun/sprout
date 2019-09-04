import React from 'react'
import { Link } from "react-router-dom";
import { formatTitle } from "./utilities/formatString";

// export default function User(props) {

//         let details = Object.entries(props).map(detail => {
//             let n = ['userId', 'handleUpdateUser', 'updateUserRef']
//             if(!n.includes(detail[0])){
//                 return (
//                     <div name={detail[0]} className="plant-info__details__category">
//                         <div className="plant-info__details__category-title">
//                             <span>{formatTitle(detail[0])} </span>
//                         </div>
//                         <div name={detail[0]} className="plant-info__details__category-content" contentEditable="true">
//                             <span >{detail[1]}</span>
//                         </div>
//                     </div>
//                 )
//             }

//         })
//         return (
//             <section className='user-page'>
//                 <div className="user-page__content">
//                     <div className="user-page__header">
//                         <h1 className="user-page__header__title">Your account info</h1>
//                     </div>
//                         {details}
//                     <button className="user-page__submit-update" onClick={props.handleUpdateUser}>save changes</button>
//                 </div>
//             </section>
//         )

//     }


export default class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: ''
        }
    }

    onChange = (event) => {
        let target = event.target.getAttribute('name')
        this.setState({
            [target]: event.target.innerHTML
        })
    }
    

    render() {
        let details = Object.entries(this.props).map(detail => {
            let n = ['userId', 'handleUpdateUser', 'updateUserRef']
            if (!n.includes(detail[0])) {
                return (
                    <div name={detail[0]} className="plant-info__details__category">
                        <div className="plant-info__details__category-title">
                            <span>{formatTitle(detail[0])} </span>
                        </div>
                        <div className="plant-info__details__category-content" >
                            <span name={detail[0]} contentEditable="true" onInput={this.onChange}>{detail[1]}</span>
                        </div>
                    </div>
                )
            }

        })
        return (
            <section className='user-page'>
                <div className="user-page__content">
                    <div className="user-page__header">
                        <h1 className="user-page__header__title">Your account info</h1>
                    </div>
                    {details}
                    <button className="user-page__submit-update" onClick={(event) => { this.props.handleUpdateUser(event, this.state) }}>save changes</button>
                </div>
            </section>
        )

    }
}

