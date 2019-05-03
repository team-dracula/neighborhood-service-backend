// Link.react.test.js
import React from 'react';
import Index from '../client/src/index.jsx';
import renderer from 'react-test-renderer';


test('Link changes the class when hovered', () => {
  const property = {
    address: "0693 Lee Port",
    bath: 3,
    beds: 7,
    id: 3655554,
    imgurl: "https://images.unsplash.com/photo-1552515717-d9ba96cbafb0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    latitude: 61.0974,
    longitude: -36.4453,
    price: 2946099,
    sqft: 3410,
    zoomlevel: 9
  }

  const changeCurrentProperty = function(propertyId) {
    for (var i = 0; i < this.state.properties.length; i++) {
        if (this.state.properties[i].uniqueId === propertyId) {
            this.setState({
                currentProperty: this.state.properties[i]
            })
        }
    }
  }

  const component = renderer.create(
    <Map properties={[property]} currentProperty={property} changeCurrentProperty={changeCurrentProperty}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});