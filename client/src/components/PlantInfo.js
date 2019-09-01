import React from 'react'

export default class PlantInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            plant: {},
            plantTrefleInfo: {}

        }
    }

    componentDidUpdate(prevProps, prevState) {
        let { plantId, userPlants, userPlantsTrefleInfo } = this.props

        if (userPlants.length && userPlantsTrefleInfo.length && !Object.entries(prevState.plant).length) {
            let currPlant =  userPlants.find(p => { return p.id.toString() === plantId })
            this.setState({
                plant: currPlant,
                plantTrefleInfo: userPlantsTrefleInfo.find(treflePlant => { return treflePlant.id === currPlant.trefleReferenceId }),
                isLoading: false,
            })
        }
    }

    render() { 
        let { plant, plantTrefleInfo, isLoading } = this.state

        
        return isLoading ?
            "Loading plant info"
            : (
                <section className="plant-info">
                    <div className="plant-info__content">
                        <div className="plant-info__content__title">
                            <span className="plant-info__content__title-pet-name">{plant.name}</span>
                            <span className="plant-info__content__title-common-name">{plantTrefleInfo.common_name}</span>
                        </div>
                        <div className="plant-info__content__image" style={{ background: `url()`, backgroundSize: 'cover' }}></div>
                        <div className="plant-info__content__details">
                            <div className="plant-info__content__details__category">
                                <span className="plant-info__content__details__category-title"></span>
                                <span className="plant-info__content__details__category-value"></span>
                            </div>
                            <div className="plant-info__content__details__category">
                                <span className="plant-info__content__details__category-title"></span>
                                <span className="plant-info__content__details__category-value"></span>
                            </div>
                            <div className="plant-info__content__details__category">
                                <span className="plant-info__content__details__category-title"></span>
                                <span className="plant-info__content__details__category-value"></span>
                            </div>
                            <div className="plant-info__content__details__category">
                                <span className="plant-info__content__details__category-title"></span>
                                <span className="plant-info__content__details__category-value"></span>
                            </div>
                            <div className="plant-info__content__details__category">
                                <span className="plant-info__content__details__category-title"></span>
                                <span className="plant-info__content__details__category-value"></span>
                            </div>
                        </div>
                    </div>

                </section>
            )
    }
}
