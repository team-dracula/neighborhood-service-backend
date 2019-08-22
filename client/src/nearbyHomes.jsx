import React from 'react';



class NearbyHomes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFirstPicture: Math.round(Math.random() * this.props.properties.length),
            currentSecondPicture: Math.round(Math.random() * this.props.properties.length),
        }
        this.slidePicsToRight = this.slidePicsToRight.bind(this);
        this.slidePicsToLeft = this.slidePicsToLeft.bind(this);
    }

    slidePicsToRight() {
        if (this.state.currentSecondPicture < 95 && this.state.currentFirstPicture < 95) {
            this.setState({
                currentFirstPicture: this.state.currentFirstPicture + 2, 
                currentSecondPicture: this.state.currentSecondPicture + 2
            })
        }
    }

    slidePicsToLeft() {
        if (this.state.currentFirstPicture > 5 && this.state.currentSecondPicture > 5) {
            this.setState({
                currentFirstPicture: this.state.currentFirstPicture - 2, 
                currentSecondPicture: this.state.currentSecondPicture - 2
            })
        }
    }

    render() {
        console.log('property: ', this.props.properties[0])
        // debugger;
        return (
            <div id="nearbyHomesSectionContainer">
                <h5>NEARBY HOMES</h5>
                <div id="nearbyHomesCarrouselContainer">
                    <button className="nearbyHomesPicsScroll" onClick={this.slidePicsToLeft}>{'<'}</button>
                    
                    <div className="nearbyHomesPicContainer">
                        <img className="nearbyHomesPic" onClick={() => document.location.pathname = '/' + this.state.currentFirstPicture} src={ this.props.properties[this.state.currentFirstPicture > this.props.properties.length ? 0 : this.state.currentFirstPicture - 1].imgurl}></img>
                        <div className="nearbyHomesPicTextOverlayPhotos">{0 + ' photos'}</div>
                        <div className="nearbyHomesPicTextOverlayOnOffMarket">On Market</div>
                        {/* <div className="nearbyHomesPicTextOverlayPrice">{'$' + Math.round(this.props.properties[this.state.currentFirstPicture].price/1000) + 'K'}</div> */}
                        {/* <div className="nearbyHomesPicTextOverlayBeds">{this.props.properties[this.state.currentFirstPicture].beds + ' beds, ' + this.props.properties[this.state.currentFirstPicture].baths + ' baths, ' + this.props.properties[this.state.currentFirstPicture].sqft + ' sqft'}</div> */}
                        {/* <div className="nearbyHomesPicTextOverlayAddress">{this.props.properties[this.state.currentFirstPicture].address}</div> */}
                    </div>

                    <div className="nearbyHomesPicContainer">
                        <img className="nearbyHomesPic" onClick={() => document.location.pathname = '/' + this.state.currentSecondPicture} src={this.props.properties[this.state.currentFirstPicture > this.props.properties.length ? 0 : this.state.currentFirstPicture - 1].imgurl}></img>
                        <div className="nearbyHomesPicTextOverlayPhotos">{0 + ' photos'}</div>
                        <div className="nearbyHomesPicTextOverlayOnOffMarket">On Market</div>
                        <div className="nearbyHomesPicTextOverlayPrice">{'$' + Math.round(this.props.properties[ this.state.currentSecondPicture > this.props.properties.length ? 0 : this.state.currentSecondPicture - 1].price/1000) + 'K'}</div>
                        <div className="nearbyHomesPicTextOverlayBeds">{this.props.properties[this.state.currentSecondPicture > this.props.properties.length ? 0 : this.state.currentSecondPicture - 1].beds + ' beds, ' + this.props.properties[this.state.currentSecondPicture > this.props.properties.length ? 0 : this.state.currentSecondPicture - 1].baths + ' baths, ' + this.props.properties[this.state.currentSecondPicture > this.props.properties.length ? 0 : this.state.currentSecondPicture - 1].sqft + ' sqft'}</div>
                        <div className="nearbyHomesPicTextOverlayAddress">{this.props.properties[this.state.currentSecondPicture > this.props.properties.length ? 0 : this.state.currentSecondPicture - 1].address}</div>
                    </div>

                    <button className="nearbyHomesPicsScroll" onClick={this.slidePicsToRight}>{'>'}</button>
                </div>
            </div>
        );
    }
}

module.exports = NearbyHomes;