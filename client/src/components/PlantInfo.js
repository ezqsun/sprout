import React from 'react'
import PlantInfoDetail from './PlantInfoDetail'

export default class PlantInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            // plant: {},
            // plantTrefleInfo: {},
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     let { plantId, userPlants, userPlantsInfo } = this.props

    //     if (userPlants.length && userPlantsInfo.length && !Object.entries(prevState.plant).length) {
    //         let currPlant = userPlants.find(p => { return p.id.toString() === plantId })
    //         let currPlantTrefleInfo = userPlantsInfo.find(treflePlant => { return treflePlant.id === currPlant.trefleReferenceId })
    //         let { common_name } = currPlantTrefleInfo
    //         let { moisture_use, resprout_ability, shade_tolerance, temperature_minimum } = currPlantTrefleInfo.growth
    //         let { growth_rate, growth_period, growth_form } = currPlantTrefleInfo.specifications
    //         let temperature_minimum_C = temperature_minimum["deg_c"]
    //         console.log(currPlantTrefleInfo)

    //         this.setState({
    //             plant: currPlant,
    //             images: currPlantTrefleInfo.images,
    //             plantTrefleInfo: {common_name, moisture_use, resprout_ability, shade_tolerance, growth_form, growth_period, growth_rate, temperature_minimum_C, },
    //             isLoading: false,
    //         })
    //     }
    // }
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

        let plantDetailCards, imagesDisplay

        if (userPlantData && plantData) {
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
            else {
                let details = ["id", "name", "image_url"]
                Object.entries(plantData).map(detail => {
                    if (!details.includes(detail[0])) {
                        return <PlantInfoDetail key={detail[0]} title={detail[0]} value={detail[1]} />
                    }
                })
            }
        }

        // if (images.length !== 0) {
        //     imagesDisplay = <div className="plant-info__content__image" style={{ width: '50vw', height: '50vh', background: `url(${`${images[0].url}`})`, backgroundSize: 'cover' }}></div>
        //     console.log(images[0].url)

        // }

        // return (
        return this.state.isLoading ?
            "Loading plant info"
            : (
                <section className="plant-info">
                    <div className="plant-info__content">
                        <div className="plant-info__content__title">
                            <span className="plant-info__content__title-pet-name">{userPlantData.name}</span>
                        </div>
                        {/* {imagesDisplay} */}

                        <div className="plant-info__content__details">
                            {plantDetailCards}
                        </div>
                    </div>

                </section>
            )
    }
}
