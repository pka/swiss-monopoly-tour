Swiss Monopoly Storymap
=======================

Source code of the Swiss Monopoly Journey Storymap.

Making-of
---------

### Data preparation

    ogr2ogr -f GPKG monopoly.gpkg Schienennetz_LV95_20171210.gdb KmLinie
    ogr2ogr -f GPKG monopoly.gpkg -append -nln etappen Schienennetz_LV95_20171210.gdb KmLinie
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
