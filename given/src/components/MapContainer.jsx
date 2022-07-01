import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { Component } from 'react';
const mapStyles = {
  width: '30%',
  height: '30%',
  marginLeft: '25%',
  padding:'5%',
  z:'0',
  id:'mapa'
};
export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        initialCenter={{ lat: 38.382778, lng: -0.514722}}
      >
      <Marker position={{ lat: 38.382778, lng: -0.514722}} />
    </Map>
    );
  }s
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyANsTqNew33gWzd3EsSEBFWFLt0W1K7dio")
})(MapContainer)