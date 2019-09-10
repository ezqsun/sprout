import React from 'react'
import App from './App'
import axios from 'axios'
import { formatToday } from './utilities/formatDate'
import { formatSearchString } from './utilities/formatString'
import { isValidDate } from './utilities/isValidDate'
import loading from '../assets/icons/svg/loading.svg'
import { createHashHistory } from 'history'

const history = createHashHistory()

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
            userPlantsInfo: [],
            currPlant: [],
            currentCollectionPlants: [],
            searchResults: [],
            currSearchResult: {},
            isLoading: true,
            isLoggedIn: false,
        }
    }


    registerRef = React.createRef()
    searchRef = React.createRef()
    addPlantRef = React.createRef()
    updateUserRef = React.createRef()

    submitRegister = (event) => {
        event.preventDefault()
        let userData = {
            firstName: this.registerRef.current.firstName.value,
            lastName: this.registerRef.current.lastName.value,
            userName: this.registerRef.current.userName.value,
            email: this.registerRef.current.email.value,
            password: this.registerRef.current.password.value,
        }

        axios.post('/register', userData, {'headers': {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            .then(response => {
                console.log(response.data)
                this.handleLogin(userData.email, userData.password)
            })
            .catch(error => console.log(error))
    }

    setUser = () => {
        axios.get(`/user/${this.state.userId}`,  {'headers': {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
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
        axios.get(`/user/${this.state.userId}/garden`,  {'headers': {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            .then(response => {
                this.setState({
                    userCollections: response.data
                })
            })
            .catch(error => console.log('error setting collection: ' + error))
    }

    setAllPlants = () => {
        axios.get(`/user/${this.state.userId}/plants`,  {'headers': {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            .then(response => {
                this.setState({ userPlants: response.data })

                //sets userPlantsInfo with array of data for all user plants
                let promises = []
                response.data.forEach(plant => {
                    plant.trefleReferenceId < 100 ?
                        promises.push(axios.get(`/plant/harvesthelper/${plant.trefleReferenceId}`))
                        :
                        promises.push(axios.get(`/plant/trefle/${plant.trefleReferenceId}`))
                })

                axios.all(promises)
                    .then(results => {
                        let trefleData = []
                        results.forEach(response => {
                            trefleData.push(response.data)
                        })
                        this.setState({ userPlantsInfo: trefleData })
                    })
                    .catch(error => console.log('error setting user plants trefle info: ' + error))

            })
            .catch(error => console.log('error setting plants: ' + error))
    }

    updatePlantSchedule = (event, plantId, category) => {
        axios.put(`/user/${this.state.userId}/${plantId}`, {
            value: formatToday(),
            category: category
        },  {'headers': {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            .then(response => {
                this.setAllPlants()
            })
            .catch(error => console.log(error))
    }

    handleSearchForPlant = (event) => {
        event.preventDefault()
        let query = this.searchRef.current.value
        let a = formatSearchString(query + 's')
        let b = formatSearchString(query + 'es')
        let q = formatSearchString(query)
        console.log(a, b, q)

        let promises = [axios.get(`/plant/trefle/name/${q}`), axios.get(`/plant/harvesthelper/name/${q}`), axios.get(`/plant/harvesthelper/name/${a}`), axios.get(`/plant/harvesthelper/name/${b}`)]
        axios.all(promises)
            .then(axios.spread((trefle, harvesthelper1, harvesthelper2, harvesthelper3) => {
                let newSearchResults = []
                if (trefle.data !== '') {
                    newSearchResults.push(trefle.data)
                }
                let harvesthelperData = [harvesthelper1, harvesthelper2, harvesthelper3]
                console.log(harvesthelperData)
                harvesthelperData.forEach(data => {
                    if (data.data) {
                        newSearchResults.push(data.data)
                    }
                })
                if (!newSearchResults.length) {
                    newSearchResults.push('No matches found')
                }
                this.setState({ searchResults: newSearchResults })


            }))
            .catch(error => console.log('error searching for plant: ' + error))

        event.target.reset()
    }
    handleSelectPlantInfo = (id) => {
        let userPlantData = this.state.userPlants.find(plant => { return plant.id.toString() === id })
        let plantData = this.state.userPlantsInfo.find(plant => { return plant.id === userPlantData.trefleReferenceId })
        console.log(userPlantData, plantData)

        this.setState({ currPlant: [userPlantData, plantData] })
        console.log('call')

    }

    handleAddPlant = (event, plantDataId) => {
        console.log('1')
        event.preventDefault()
        let newPlant = {
            name: this.addPlantRef.current['plant-name'].value,
            collectionId: 1,
            trefleReferenceId: plantDataId,
            lastWatered: this.addPlantRef.current['last-watered'].value,
            lastFertilized: this.addPlantRef.current['last-fertilized'].value,
            userId: this.state.userId
        }
        //verify all fields are filled out
        let validateForm = Object.values(newPlant).filter(value => { return value === '' })
        if (!validateForm.length) {
            if (isValidDate(newPlant.lastWatered) && isValidDate(newPlant.lastFertilized)) {
                this.addPlantRef.current.reset()

                axios.post(`/user/${this.state.userId}/add-plant`, newPlant,  {'headers': {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
                    .then(response => { 
                        axios.get(`/user/${this.state.userId}/plants`,  {'headers': {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
                        .then(response => {
                            this.setState({ userPlants: response.data })
            
                            //sets userPlantsInfo with array of data for all user plants
                            let promises = []
                            response.data.forEach(plant => {
                                plant.trefleReferenceId < 100 ?
                                    promises.push(axios.get(`/plant/harvesthelper/${plant.trefleReferenceId}`))
                                    :
                                    promises.push(axios.get(`/plant/trefle/${plant.trefleReferenceId}`))
                            })
                            console.log(promises)
            
                            axios.all(promises)
                                .then(results => {
                                    let trefleData = []
                                    results.forEach(response => {
                                        trefleData.push(response.data)
                                    })
                                    this.setState({ userPlantsInfo: trefleData })

                                })
                                .catch(error => console.log('error setting user plants trefle info: ' + error))
            
                        })
                        .catch(error => console.log('error setting plants: ' + error))
                     })
                    .catch(error => console.log('error adding plant: ' + error))
            } else {

                alert('Please fill in dates in the following format: yyyy-mm-dd')
            }

        } else {
            alert('Please fill in all fields!')
        }
    }

    handleCancelForm = (event) => {
        event.preventDefault()
        this.addPlantRef.current.reset()
    }

    handleRemovePlant = (event, plantId) => {
        event.preventDefault()
        axios.delete(`/user/${this.state.userId}/${plantId}`,  {'headers': {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            .then(response => {
                console.log(response)
                this.setAllPlants()
            })
            .catch(error => console.log(error))
    }

    handleUpdateUser = (event, info) => {
        event.preventDefault()
        let newInfo = {
            firstName: info.firstName,
            lastName: info.lastName,
            userName: info.userName,
            email: info.email
        }

        Object.entries(newInfo).map(([key, value]) => {
            if (value === '') {
                newInfo[key] = this.state[key]
            }
        })
        axios.put(`/user/${this.state.userId}`, newInfo,  {'headers': {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}})
            .then(response => {
                console.log(response)
                this.setUser()
            })
            .catch(error => console.log(error))
    }


    handleLogin = (email, password) => {
        axios.post('/login', { email: email, password: password })
            .then(response => {
                this.setState({
                    userId: response.data.userId,
                    isLoggedIn: true,
                })
                sessionStorage.setItem('token', response.data.token)
                let promises = [this.setUser(), this.setCollection(), this.setAllPlants()]
                axios.all(promises)
                    .then(results => {
                        this.setState({
                            isLoading: false,
                        })
                    })
                    .catch(error => console.log('error setting user, user collections, and user plants: ' + error))

            })
            .catch(error => "error logging in: " + error)
    }

    handleLogOut = () =>{
        sessionStorage.removeItem('token')
        this.setState({isLoggedIn: false})
        window.location.replace("http://localhost:3000/")
    }

    componentDidMount() {
        console.log(history)

        let promises = [this.setUser(), this.setCollection(), this.setAllPlants()]
        axios.all(promises)
            .then(results => {
                this.setState({
                    isLoading: false,
                })
            })
            .catch(error => console.log('error setting user, user collections, and user plants: ' + error))
    }


    render() {
        console.log(this.state)

        return this.state.isLoading ?
            ""
            :
            <App
                submitRegister={this.submitRegister}
                registerRef={this.registerRef}
                state={this.state} setPlants={this.setPlants}
                updatePlantSchedule={this.updatePlantSchedule}
                handleSearchForPlant={this.handleSearchForPlant}
                handleSelectPlantInfo={this.handleSelectPlantInfo}
                searchRef={this.searchRef}
                addPlantRef={this.addPlantRef}
                handleAddPlant={this.handleAddPlant}
                handleCancelForm={this.handleCancelForm}
                handleRemovePlant={this.handleRemovePlant}
                handleUpdateUser={this.handleUpdateUser}
                updateUserRef={this.updateUserRef}
                handleLogin={this.handleLogin}
                handleLogOut={this.handleLogOut}
                history={history}
            />

    }

}
