import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import enterView from 'enter-view';
import mediumZoom from 'medium-zoom';
import './index.css';
import places from './places.json';
import tour from './tour.json';

mapboxgl.accessToken = 'pk.eyJ1Ijoic291cmNlcG9sZSIsImEiOiJjanB6bWxoazEwY2plNDhsY3RpenBvNmM0In0.Z--2Th6QmaLc_OhPDNsiwg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [8.228760,46.873336],
    zoom: 7,
    touchZoomRotate: false
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

var activePlaceNo = 0;
function setActivePlace(placeNo) {
    if (placeNo === activePlaceNo) return;
    var place = places.features[placeNo];
    map.flyTo({
        center: place.geometry.coordinates,
        zoom: 9,
        speed: 0.5
    });
    activePlaceNo = placeNo;
}

enterView({
    selector: 'article .step',
    enter: function(el) {
        setActivePlace(el.dataset.index);
        el.classList.add('active');
    },
    exit: function(el) {
        el.classList.remove('active');
    },
    offset: 0.5,
});

mediumZoom('.step img', {
  margin: 24,
  background: 'rgba(25, 18, 25, .7)'
});
