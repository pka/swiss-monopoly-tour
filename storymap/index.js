import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mediumZoom from 'medium-zoom'
import './index.css';
import places from './places.json';
import tour from './tour.json';

mapboxgl.accessToken = 'pk.eyJ1Ijoic291cmNlcG9sZSIsImEiOiJjanB6bWxoazEwY2plNDhsY3RpenBvNmM0In0.Z--2Th6QmaLc_OhPDNsiwg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [8.228760,46.873336],
    zoom: 7
});

map.on('load', function () {
    map.addSource('places', {
        'type': 'geojson',
        'data': places
    });
    map.addLayer({
        'id': 'place-markers',
        'type': 'circle',
        'source': 'places',
        'paint': {
            'circle-color': 'blue'
        }
    });
    map.addLayer({
        'id': 'place-label',
        'type': 'symbol',
        'source': 'places',
        "layout": {
            "text-field": '{name}',
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.2],
            "text-anchor": "top"
        }
    });
    map.addLayer({
        'id': 'tour',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': tour
        }
    });
});

// On every scroll event, check which element is on screen
window.onscroll = function() {
    for (var i = 0; i < places.features.length; i++) {
        if (isElementOnScreen(i)) {
            setActivePlace(i);
            break;
        }
    }
};
var activePlaceNo = 0;
function setActivePlace(placeNo) {
    if (placeNo === activePlaceNo) return;
    var place = places.features[placeNo];
    map.flyTo({
        center: place.geometry.coordinates,
        zoom: 9,
        speed: 0.5
    });
    document.getElementById(placeNo.toString()).setAttribute('class', 'active');
    document.getElementById(activePlaceNo.toString()).setAttribute('class', '');
    activePlaceNo = placeNo;
}
function isElementOnScreen(id) {
    var element = document.getElementById(id.toString());
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}

mediumZoom('section img', {
  margin: 24,
  background: 'rgba(25, 18, 25, .7)'
});
