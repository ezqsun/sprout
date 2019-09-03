import React from 'react'
import PlantInfoDetail from './PlantInfoDetail'
import ModalAddPlant from './ModalAddPlant'
import { Redirect } from "react-router-dom";

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

    render() {
        console.log(this.state)
        console.log(this.props)

        let image_url, titleText, pageContent, plantDetailCards, imagesDisplay, plantData, userPlantData, title, addPlantBtn

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
                addPlantBtn = <button className="plant-info__add-plant" onClick={()=>this.setState({showModal:true})}>+</button>
            } else {
                let { currPlant } = this.props
                userPlantData = currPlant[0]
                let data = currPlant[1]
                plantData = data
                title =
                    < div className="plant-info__content__title" >
                        <span className="plant-info__content__title-pet-name">{userPlantData.name}</span>
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
                        <span className="plant-info__content__title-pet-name">{titleText}</span>
                    </div>
                pageContent =
                    <div className="plant-info__content">
                        {title}
                        <div className="plant-info__content__details">
                            {plantDetailCards}
                        </div>
                        {addPlantBtn}
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
                titleText = plantData.name
                title =
                    <div className="plant-info__content__title">
                        <span className="plant-info__content__title-pet-name">{titleText}</span>
                    </div>
                imagesDisplay = <div className="plant-info__content__image" style={{ width: '50vw', height: '50vh', background: `url(${`https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${image_url}`})`, backgroundSize: 'cover' }}></div>
                pageContent =
                    <section className="plant-info">
                        <div className="plant-info__content">
                            {title}
                            {imagesDisplay}
                            <div className="plant-info__content__details">
                                {plantDetailCards}
                            </div>
                            {addPlantBtn}
                        </div>
                    </section>
            }
            // }
            let modal
            if (this.state.showModal) {
                modal = <ModalAddPlant plantName={titleText}/>

            }

            return (
                <div className="plant-info-page">
                    {pageContent}
                    {modal}
                </div>
            )

        }
    }
}
