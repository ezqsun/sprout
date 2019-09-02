import React from 'react'
import PlantInfoDetail from './PlantInfoDetail'

export default class PlantInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            plant: {},
            plantTrefleInfo: {},
            images: [],

        }
    }

    componentDidUpdate(prevProps, prevState) {
        let { plantId, userPlants, userPlantsTrefleInfo } = this.props

        if (userPlants.length && userPlantsTrefleInfo.length && !Object.entries(prevState.plant).length) {
            let currPlant = userPlants.find(p => { return p.id.toString() === plantId })
            let currPlantTrefleInfo = userPlantsTrefleInfo.find(treflePlant => { return treflePlant.id === currPlant.trefleReferenceId })
            let { common_name } = currPlantTrefleInfo
            let { moisture_use, resprout_ability, shade_tolerance, temperature_minimum } = currPlantTrefleInfo.growth
            let { growth_rate, growth_period, growth_form } = currPlantTrefleInfo.specifications
            let temperature_minimum_C = temperature_minimum["deg_c"]
            console.log(currPlantTrefleInfo)

            this.setState({
                plant: currPlant,
                images: currPlantTrefleInfo.images,
                plantTrefleInfo: {common_name, moisture_use, resprout_ability, shade_tolerance, growth_form, growth_period, growth_rate, temperature_minimum_C, },
                isLoading: false,
            })
        }
    }

    render() {
        let { plant, plantTrefleInfo, isLoading, images } = this.state
        let plantDetailCards, imagesDisplay

        if(Object.entries(plant).length !== 0 && Object.entries(plantTrefleInfo).length !== 0){
            plantDetailCards =  Object.entries(plantTrefleInfo).map((key, index)=>{
                if (key[1]) {
                    return <PlantInfoDetail key={key[0]} title={key[0]} value={key[1]} />
                } else {
                    return
                }

            })

        }

        if(images.length !==0){
            imagesDisplay = <div className="plant-info__content__image" style={{ width: '50vw', height: '50vh', background: `url(${`${images[0].url}`})`, backgroundSize: 'cover' }}></div>
            console.log(images[0].url)

        }


        return isLoading ?
            "Loading plant info"
            : (
                <section className="plant-info">
                    <div className="plant-info__content">
                        <div className="plant-info__content__title">
                            <span className="plant-info__content__title-pet-name">{plant.name}</span>
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
