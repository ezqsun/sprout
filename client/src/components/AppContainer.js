import React from 'react'
import App from './App'
import axios from 'axios'
import { formatToday } from './utilities/formatDate'

export default class AppContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            userId: 1,
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            userCollections: [],
            userPlants: [],
            userPlantsTrefleInfo: [],
            currentCollectionPlants: [],
            isLoading: true,
        }
    }

    registerRef = React.createRef()

    submitRegister = (event) => {
        event.preventDefault()
        let userData = {
            firstName: this.registerRef.current.firstName,
            lastName: this.registerRef.current.lastName,
            userName: this.registerRef.current.userName,
            email: this.registerRef.current.email,
            password: this.registerRef.current.password,
        }

        axios.post('/register', userData)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    setUser = () => {
        axios.get(`/user/${this.state.userId}`)
            .then(response => {
                let { userId, firstName, lastName, userName, email } = response.data
                this.setState({
                    userId: userId,
                    firstName: firstName,
                    lastName: lastName,
                    userName: userName,
                    email: email,
                })
            })
            .catch(error => console.log('error setting user info: ' + error))
    }

    setCollection = () => {
        axios.get(`/user/${this.state.userId}/garden`)
            .then(response => {
                this.setState({
                    userCollections: response.data
                })
            })
            .catch(error => console.log('error setting collection: ' + error))
    }

    // setPlants = (collectionId) =>{
    //     axios.get(`/user/${this.state.userId}/plants/${collectionId}`)
    //     .then(response=>{
    //         this.setState({
    //             currentCollectionPlants: response.data
    //         })
    //     })
    //     .catch(error=>console.log('error setting plants: ' + error))
    // }

    setAllPlants = () => {
        axios.get(`/user/${this.state.userId}/plants`)
            .then(response => {
                this.setState({ userPlants: response.data })

                //sets userPlantsTrefleInfo with array of data for all user plants
                let promises = []
                response.data.forEach(plant => {
                    promises.push(axios.get(`/plant/${plant.trefleReferenceId}`))
                })

                axios.all(promises)
                    .then(results => {
                        let trefleData = []
                        results.forEach(response => {
                            trefleData.push(response.data)
                        })
                        this.setState({ userPlantsTrefleInfo: trefleData })
                    })
                    .catch(error => console.log('error setting user plants trefle info: ' + error))

            })
            .catch(error => console.log('error setting plants: ' + error))
    }

    updatePlantSchedule = (event, plantId, category) => {
        axios.put(`/user/${this.state.userId}/${plantId}`, {
            value: formatToday(),
            category: category
        })
            .then(response => {
                this.setAllPlants()
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        let promises = [this.setUser(), this.setCollection(), this.setAllPlants()]
        axios.all(promises)
            .then(results => {
                this.setState({
                    isLoading: false,
                })
            })
            .catch(error=>console.log('error setting user, user collections, and user plants: ' + error))
    }
    render() {
        console.log(this.state)

        return this.state.isLoading ?
            ""
            :
            <App submitRegister={this.submitRegister} registerRef={this.registerRef} state={this.state} setPlants={this.setPlants} updatePlantSchedule={this.updatePlantSchedule} />

    }

}
