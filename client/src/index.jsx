import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Map from './map.jsx';
import NeighborhoodInfo from './neighborhoodInfo.jsx';
import NearbyHomes from './nearbyHomes.jsx';


class NeighborhoodSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            properties: [],
            currentProperty: undefined
        }

        this.getProperties = this.getProperties.bind(this);
        this.changeCurrentProperty = this.changeCurrentProperty.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount() {
        this.getProperties();
    }

    getProperties() {
        // change axios to a post request
        // pas this function down as a prop
        // pass the bounds obj to it
        // send the bounds obj to the /mapChange route
        // populate the state based on the bounds of the window
        console.log("this.state: ", this.state)
        Axios.get('/items')
        .then(response => {  
            return this.setState({
            properties: response.data,
            currentProperty: response.data[window.location.pathname.substring(1) - 1] || response.data[0]
        }) }
        )
        .catch(err => console.log('error fetching data'))
    }

    changeCurrentProperty(propertyId) {
        for (var i = 0; i < this.state.properties.length; i++) {
            if (this.state.properties[i].uniqueId === propertyId) {
                this.setState({
                    currentProperty: this.state.properties[i]
                })
            }
        }
    }

    handleOnChange(data) {
        // console.log('data inside handleOnChange Func: ', data) 
        console.log('handleChange Data: ', data);
        if (Array.isArray(data) === true && data.length === 0 ) {
            data = [{ id: 2,
                price: 2422899,
                beds: 8,
                bath: 4,
                sqft: 3849,
                address: '677 Lakin Causeway',
                latitude: 40.7128,
                longitude: -74.0060,
                imgurl:
                 'https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                zoomlevel: 1 }
            ]
        }

        console.log('handleChange Data: ', data);
        this.setState({
            properties: data,
            currentProperty: data[0] 
        })
        // console.log('this.state inside index.jsx: ', this.state)
    }

    render() {
        if (this.state.properties.length > 0) {
            return (
                <div>
                    <NeighborhoodInfo properties={this.state.properties} currentProperty={this.state.currentProperty}/>
                    <Map handleOnChange={this.handleOnChange} properties={this.state.properties} currentProperty={this.state.currentProperty} changeCurrentProperty={this.changeCurrentProperty}/>
                    <NearbyHomes properties={this.state.properties}/>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}



ReactDOM.render(<NeighborhoodSection />, document.getElementById('Neighborhood'));

