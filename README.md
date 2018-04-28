# 5imply Weather

## Overview

A minimal weather application that provides a 5-day and hourly forecast based on the user's inputted address.

**Features:**

* Users are able to enter an address to see a 5-day forecast
* Users can click on a day card to be navigated to a 24-hour forecast for the day

## Install

Move to root project folder and with npm: `npm install`

## Usage

**To setup:**

1.  Acquire a [Darksky Secret Key](https://darksky.net/dev)
2.  Acquire a [GoogleMaps Geocoding API Key](https://developers.google.com/maps/documentation/geocoding/get-api-key)
3.  Place keys in a `dev.js` file in `./config` directory

**To run:**

Move to root folder and with npm: `npm run dev`

## Details

The backend server is necessary to communicate with the Darksky API as they don't allow CORS.
