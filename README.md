Swiss Monopoly Tour
===================

Source code of the Swiss Monopoly Tour storymap.

Making-of
---------

### Data preparation

    ogr2ogr -f GPKG monopoly.gpkg Schienennetz_LV95_20171210.gdb KmLinie
    ogr2ogr -f GPKG monopoly.gpkg -append -nln tour Schienennetz_LV95_20171210.gdb KmLinie
    ogr2ogr -f GPKG monopoly.gpkg -append didok-liste.shp
    ogr2ogr -f GPKG monopoly.gpkg -append -nln places didok-liste.shp

### Application

    npm init
    npm install --save mapbox-gl
    npm install --save-dev babel-core babel-preset-env
    npm install --save-dev parcel-bundler

Add configuration in `.babelrc` and start script int `package.json`.

### Usage

Run application:

    npm start


Credits
-------

I would like to thank the following people for inspiration and/or code:
* @fmemuir ([brewdog-map](https://github.com/fmemuir/brewdog-map))
* @felixmichel ([Bikemap](https://medium.com/@felixmichel/how-we-mapped-all-registered-bike-accidents-in-basel-f4ec0bc2a6be))
* @devongovett ([parcel](https://parceljs.org/))
* @russellgoldenberg ([enter-view.js](https://github.com/russellgoldenberg/enter-view))
* @francoischalifour ([medium-zoom](https://github.com/francoischalifour/medium-zoom))
