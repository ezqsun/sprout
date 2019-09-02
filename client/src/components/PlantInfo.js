import React from 'react'
import PlantInfoDetail from './PlantInfoDetail'

export default class PlantInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        }
    }
    componentDidMount() {
        this.props.handleSelectPlantInfo(this.props.plantId)
        console.log('mount')
    }
    componentDidUpdate(prevProps, prevState) {
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

    render() {
        let { currPlant } = this.props
        let userPlantData = currPlant[0]
        let plantData = currPlant[1]
        let image_url

        let plantDetailCards, imagesDisplay

        if (userPlantData && plantData) {
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
            }
        }

        if (image_url) {
            imagesDisplay = <div className="plant-info__content__image" style={{ width: '50vw', height: '50vh', background: `url(${`https://res-4.cloudinary.com/do6bw42am/image/upload/c_scale,f_auto,h_300/v1/${image_url}`})`, backgroundSize: 'cover' }}></div>

        }

        return this.state.isLoading ?
            "Loading plant info"
            : (
                <section className="plant-info">
                    <div className="plant-info__content">
                        <div className="plant-info__content__title">
                            <span className="plant-info__content__title-pet-name">{userPlantData.name}</span>
                        </div>
                        {imagesDisplay}
                        <div className="plant-info__content__details">
                            {plantDetailCards}
                        </div>
                    </div>

                </section>
            )
    }
}
