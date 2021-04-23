# Cat Finder 9000

[https://cat-finder-9000.herokuapp.com/](https://cat-finder-9000.herokuapp.com/)

This is a demo website built using a [React](https://reactjs.org/) frontend, styled
with [Tailwind CSS](https://tailwindcss.com/) and served using [Express.js](https://expressjs.com/).

It handles URL routing using [Reach Router](https://reach.tech/router/)

It uses [Google Maps' Places Autocomplete API](https://developers.google.com/maps/documentation/javascript/places-autocomplete)
for location suggestions when the user interacts with the search box.
It uses [Google Maps' Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview)
to convert arbitrary user input into a formatted address.

## Getting started

- requires:
  - [node](https://nodejs.org/en/download/) version 14.x
  - npm version 7.x - `npm install npm@latest -g`

`npm install && cd client && npm install && cd ..`

`npm run start`
