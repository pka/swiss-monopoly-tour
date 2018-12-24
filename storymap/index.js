import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import enterView from 'enter-view';
import mediumZoom from 'medium-zoom';
import './index.css';
import places from './places.json';
import tracks from './tracks.json';

mapboxgl.accessToken = 'pk.eyJ1Ijoic291cmNlcG9sZSIsImEiOiJjanB6bWxoazEwY2plNDhsY3RpenBvNmM0In0.Z--2Th6QmaLc_OhPDNsiwg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [8.228760,46.873336],
    zoom: 7
});
map.fitBounds([[5.9436,45.8058], [10.5139,47.8242]]);
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();

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
            'circle-color': '#4e4b5c'
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
        },
        "paint": {
            "text-color": "#4e4b5c"
        }
    });
    map.addLayer({
        'id': 'tracks',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': tracks
        },
        "paint": {
            "line-color": "#c3859a",
            "line-width": 4
        }
    });
    map.addSource('track', { type: 'geojson', data: track });
    map.addLayer({
        "id": "track",
        "type": "line",
        "source": "track",
        "paint": {
            "line-color": "#c3859a",
            "line-width": 5
        }
    });

    updateTrackFilter(0);

    enterView({
        selector: 'article .step',
        enter: function(el) {
            el.classList.add('active');
            const placeidx = +el.dataset.index;
            updateTrackFilter(placeidx);
            if (placeidx === 0) {
                setActivePlace(placeidx);
            } else {
                animateTrack(tracks.features[placeidx-1].geometry);
            }
        },
        exit: function(el) {
            cancelAnimationFrame(animation);
            el.classList.remove('active');
        },
        offset: 0.5,
    });
});

function updateTrackFilter(placeidx) {
    // place filter
    var filter = ['in', 'fid'];
    for (var i=0; i<=placeidx; i++) {
        filter.push(places.features[i].properties['fid']);
    }
    map.setFilter('place-markers', filter);
    map.setFilter('place-label', filter);

    // track filter
    var filter = ['in', 'OBJECTID'];
    for (var i=0; i<placeidx-1; i++) {
        filter.push(tracks.features[i].properties['OBJECTID']);
    }
    map.setFilter('tracks', filter);
}

// Empty GeoJSON for animated track
var track = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": []
        }
    }]
};
var trackcoords = [];
var coordidx = 0;
var animation;

function animateLine() {
    if (coordidx < trackcoords.length) {
        track.features[0].geometry.coordinates.push(trackcoords[coordidx]);
        // update map
        map.getSource('track').setData(track);
        map.panTo(trackcoords[coordidx]);
        coordidx++;

        // Request the next frame of the animation.
        animation = requestAnimationFrame(animateLine);
    }
}

function animateTrack(multiline) {
    const lines = multiline.coordinates;
    // Append coordinates of all lines
    trackcoords = [];
    for (var i = 0; i < lines.length; i++) {
        trackcoords.push(...lines[i]);
    }
    coordidx = 0;
    track.features[0].geometry.coordinates = [];
    map.jumpTo({ 'center': trackcoords[0], 'zoom': 9 });
    animateLine();
}

function setActivePlace(placeidx) {
    var place = places.features[placeidx];
    map.flyTo({
        center: place.geometry.coordinates,
        zoom: 9,
        speed: 0.5
    });
}

mediumZoom('.step img', {
  margin: 24,
  background: 'rgba(25, 18, 25, .7)'
});
