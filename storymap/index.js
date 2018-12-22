import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import places from './places.json';
import etappen from './etappen.json';

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
        'id': 'etappen',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': etappen
        }
    });
});
