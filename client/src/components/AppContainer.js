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
            userCollections: [],
            userPlants:[],
            currentCollectionPlants: [],
            isLoading: true,
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
        axios.get(`/user/${this.state.userId}`)
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
        .catch(error=>console.log('error setting user info: ' + error))
    }

    setCollection = () =>{
        axios.get(`/user/${this.state.userId}/garden`)
        .then(response=>{
            this.setState({
                userCollections: response.data
            })
        })
        .catch(error=>console.log('error setting collection: ' + error))
    }

    setPlants = (collectionId) =>{
        axios.get(`/user/${this.state.userId}/plants/${collectionId}`)
        .then(response=>{
            this.setState({
                currentCollectionPlants: response.data
            })
        })
        .catch(error=>console.log('error setting plants: ' + error))
    }

    setAllPlants = () =>{
        axios.get(`/user/${this.state.userId}/plants`)
        .then(response=>{
            response.data.forEach(plant => {
                axios.get(`/plant/${plant.trefleReferenceId}`)
                .then(response=>{
                    plant.trefleData = response.data
                    let currUserPlants = this.state.userPlants
                    currUserPlants.push(plant)
                
                    this.setState({
                        userPlants: currUserPlants
                    })
                })
                .catch(error=>{console.log(error)})

            })

        })
        .catch(error=>console.log('error setting plants: ' + error))
    }

    componentDidMount(){
        this.setUser()
        this.setCollection()
        this.setAllPlants()
        this.setState({
            isLoading: false,
        })
    }
    render() {
        console.log(this.state)

        return this.state.isLoading?
        ""
        :
        <App submitRegister={this.submitRegister} registerRef={this.registerRef} state={this.state} setPlants={this.setPlants}/>
        
    }

}
