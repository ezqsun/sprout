import React from 'react'
import App from './App'
import axios from 'axios'

export default class AppContainer extends React.Component {
    constructor(){
        super()
        this.state = {
            userId: 1,
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            firstName: '',
            userCollections: [],
            userPlants: [],
        }
    }
    
    registerRef = React.createRef()

    submitRegister = (event) =>{
        event.preventDefault()
        let userData = {
            firstName: this.registerRef.current.firstName,
            lastName: this.registerRef.current.lastName,
            userName: this.registerRef.current.userName,
            email: this.registerRef.current.email,
            password: this.registerRef.current.password,
        }

        axios.post('/register', userData)
        .then(response=>{
            console.log(response.data)
        })
        .catch(error=>console.log(error))
    }

    setUser = () =>{
        axios.get(`/${this.userId}`)
        .then(response=>{
            let {userId, firstName, lastName, userName, email} = response.data
            this.setState({
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
            })

        })
    }

    render() {
        return (
            <App submitRegister={this.submitRegister} registerRef={this.registerRef}/>
        )
    }

}
