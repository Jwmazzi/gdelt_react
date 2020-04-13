import React from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import utils from './utils'


const geojsonMarkerOptions = {
  radius: 5,
  fillColor: "#343a3f",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
}


export default class NewsMap extends React.Component {

  componentDidMount() {

    this.map = L.map('map', {
      center: [0, 0],
      zoom: 1
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19
    }).addTo(this.map)

  }

  clearMap() {

    this.map.eachLayer((layer) => {
      if (layer.tag === 'storyPoint') {
        this.map.removeLayer(layer)
      }
    });

  }

  updateStories() {

    this.clearMap()

    // Push New Data to Map
    L.geoJSON(utils.buildGeoJSON(this.props.data.stories), {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
      },
      onEachFeature: function(feature, layer) {
        layer.tag = 'storyPoint'
        layer.bindPopup(`
        ${feature.properties.summary} <br/>
            <br/><a href="${feature.properties.sourceurl}" target="_blank">Go to the Article</a> <br/>
        `);
      }
    }).addTo(this.map);

  }

  render() {

    if (this.map) this.updateStories()

    return(
      <div id="map" style={{height: 500}}></div>
    )

  }

}