import React from 'react'
import PlantInfoDetail from './PlantInfoDetail'
import ModalAddPlant from './ModalAddPlant'
import { Redirect } from "react-router-dom";
import Modal from "react-modal";
// ReactModal.setAppElement('#modal-add-plant');

let backArrow =
    <svg onClick={() => window.history.back()} width="13px" height="25px" viewBox="0 0 13 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <title>Icon-back-arrow</title>
        <g id="Global-Style-Guide" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
            <g id="22.-InStock-Icons" transform="translate(-1221.000000, -364.000000)" fillRule="nonzero" stroke="#bfbfbf" strokeWidth="3">
                <g id="Icon-back-arrow" transform="translate(1228.000000, 376.500000) scale(-1, 1) translate(-1228.000000, -376.500000) translate(1221.000000, 365.000000)">
                    <path d="M1.0753788,7.06066017 L15.2071068,7.41421356" id="Line" transform="translate(7.707107, 6.914214) scale(-1, -1) rotate(45.000000) translate(-7.707107, -6.914214) "></path>
                    <path d="M0.221825407,16.5857864 L14.3535534,16.9393398" id="Line" transform="translate(7.353553, 16.439340) scale(-1, 1) rotate(45.000000) translate(-7.353553, -16.439340) "></path>
                </g>
            </g>
        </g>
    </svg>

export default class PlantInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSearchResult: false,
            isLoading: true,
            isRedirecting: false,
            showModal: false,
        }
    }
    componentDidMount() {
        if ('searchResults' in this.props) {
            console.log(this.props.searchResults.length === 0)
            if (this.props.searchResults.length === 0) {
                this.setState({ isRedirecting: true })
            }
            this.setState({ isSearchResult: true, isLoading: false })

        } else {
            this.setState({ isSearchResult: false })
            let { currPlant } = this.props
            let userPlantData = currPlant[0]
            let plantData = currPlant[1]
            this.props.handleSelectPlantInfo(this.props.plantId)
            console.log('mount')
            if (userPlantData && plantData) {
                this.setState({ isLoading: false })
            }
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if ('searchResults' in this.props && !('searchResults' in prevProps)) {
            console.log(this.props.searchResults.length === 0)

            if (this.props.searchResults.length === 0) {
                this.setState({ isRedirecting: true })
            }
            this.setState({ isSearchResult: true })


        } else {
            let { currPlant } = this.props
            let userPlantData = currPlant[0]
            let plantData = currPlant[1]
            if (this.props.userPlants.length !== 0 && this.props.userPlantsInfo.length !== 0 && (prevProps.userPlants.length === 0 || prevProps.userPlantsInfo.length === 0)) {
                this.props.handleSelectPlantInfo(this.props.plantId)

            }
            else if (userPlantData && plantData && (!prevProps.currPlant[0] || !prevProps.currPlant[1])) {
                this.setState({ isLoading: false })
            }
        }
    }

    handleOpenModal = () => {
        this.setState({ showModal: true })
    }
    handleCloseModal = (event) => {
        this.setState({ showModal: false })
    }
    redirectPage = (event) =>{
        event.preventDefault()

        console.log('2')
        window.history.back()
    }


    render() {
        console.log(this.state)
        console.log(this.props)

        let image_url, titleText, pageContent, plantDetailCards, imagesDisplay, plantData, userPlantData, title, addPlantBtn, removePlantBtn

        if (this.state.isLoading) {
            return "Loading plant info"
        } else {
            if (this.state.isRedirecting) {
                return <Redirect to="/search"></Redirect>
            }
            if (this.state.isSearchResult) {
                plantData = this.props.searchResults.find(result => {
                    return result.id.toString() === this.props.plantId
                })
                addPlantBtn = <button className="plant-info__add-plant" onClick={() => this.setState({ showModal: true })}>add plant to my garden</button>

            } else {
                let { currPlant } = this.props
                userPlantData = currPlant[0]
                let data = currPlant[1]
                plantData = data

                removePlantBtn = <button className="plant-info__remove-plant" onClick={(event)=>{
                    this.props.handleRemovePlant(event, this.props.plantId)
                    window.history.back()
                }}>remove from my garden</button>
                title =
                    < div className="plant-info__content__title" >
                        {backArrow}
                        <div>
                            <span className="plant-info__content__title-pet-name">{userPlantData.name}</span>
                        </div>
                    </div >

            }
            // if (userPlantData && plantData) {
            console.log(plantData)

            //plant data is from Trefle
            if ('common_name' in plantData) {
                let { common_name } = plantData
                let { moisture_use, resprout_ability, shade_tolerance, temperature_minimum } = plantData.growth
                let { growth_rate, growth_period, growth_form } = plantData.specifications
                let temperature_minimum_C = temperature_minimum["deg_c"]
                let details = [
                    { "common_name": common_name },
                    { "moisture_use": moisture_use },
                    { "resprout_ability": resprout_ability },
                    { "shade_tolerance": shade_tolerance },
                    { "temperature_minimum_(Celsius)": temperature_minimum_C },
                    { "growth_rate": growth_rate },
                    { "growth_period": growth_period },
                    { "growth_form": growth_form }]
                let filteredDetails = details.filter(detail => {
                    if (Object.values(detail)[0]) {
                        return detail
                    }
                })

                plantDetailCards = filteredDetails.map(detail => {
                    let obj = Object.entries(detail)[0]
                    let key = obj[0]
                    let value = obj[1]
                    return <PlantInfoDetail key={key} title={key} value={value} />
                })
                titleText = plantData.common_name
                title =
                    <div className="plant-info__content__title">
                        {backArrow}
                        <div>
                            <span className="plant-info__content__title-pet-name">{titleText}</span>
                        </div>
                    </div>
                pageContent =
                    <div className="plant-info__content">
                        {title}
                        <div className="plant-info__content__details">
                            {plantDetailCards}
                        </div>
                        {addPlantBtn}
                        {removePlantBtn}
                    </div>

            }

            //plant data is from harvest helper
            else {
                let details = ["id", "name", "image_url"]
                plantDetailCards = Object.entries(plantData).map(detail => {
                    if (!details.includes(detail[0])) {
                        return <PlantInfoDetail key={detail[0]} title={detail[0]} value={detail[1]} />
                    }
                    else if (detail[0] === "image_url") {
                        image_url = detail[1]
                    }
                })
                titleText = userPlantData ? userPlantData.name : plantData.name
                title =
                    <div className="plant-info__content__title">
                        {backArrow}
                        <div>
                            <span className="plant-info__content__title-pet-name">{titleText}</span>
                        </div>
                    </div>
                imagesDisplay = <div className="plant-info__content__image" style={{ background: `url(${`https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${image_url}`})`, backgroundSize: 'cover' }}></div>
                pageContent =
                    <div className="plant-info__content">
                        {title}
                        {imagesDisplay}
                        <div className="plant-info__content__details">
                            {plantDetailCards}
                        </div>
                        {addPlantBtn}
                        {removePlantBtn}
                    </div>
            }
            // }
            let modal
            if (this.state.showModal) {
                modal = <ModalAddPlant plantName={titleText} addPlantRef={this.props.addPlantRef} handleAddPlant={this.props.handleAddPlant} handleCancelForm={this.props.handleCancelForm} plantData={plantData} />
            }

            return (
                <div className="plant-info-page">
                    {pageContent}
                    {/* {modal} */}
                    <Modal
                        isOpen={this.state.showModal}
                        contentLabel="add plant modal"
                        style={{ overlay:{
                            backgroundColor: '#F2F2F2', border: 'none' }}}
                        handleCloseModal={this.handleCloseModal}
                        redirectPage={this.redirectPage}>
                        {modal}
                        {/* <button onClick={this.handleCloseModal}>Close Modal</button> */}
                    </Modal>

                </div>
            )

        }
    }
}

