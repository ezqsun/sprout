import React from 'react'
import App from './App'
import axios from 'axios'

export default class AppContainer extends React.Component {
    constructor(){
        super()
        this.state = {
            userId: '',
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            firstName: '',
            userCollections: [],
            userPlants: [],
        }
    }
    
    signUpRef = React.createRef()

    submitSignUp = (event) =>{
        event.preventDefault()
        


    }

    render() {
        return (
            <App submitSignUp={this.submitSignUp} signUpRef={this.signUpRef}/>
        )
    }

}
