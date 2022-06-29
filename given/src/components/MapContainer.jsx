import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { Component } from 'react';
const mapStyles = {
  width: '30%',
  height: '70%',
};
export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176}}
      >
      <Marker position={{ lat: 48.00, lng: -122.00}} />
    </Map>
    );
  }s
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyANsTqNew33gWzd3EsSEBFWFLt0W1K7dio")
})(MapContainer)