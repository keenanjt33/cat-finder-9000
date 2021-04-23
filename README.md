# Cat Finder 9000

[https://cat-finder-9000.herokuapp.com/](https://cat-finder-9000.herokuapp.com/)

This is a demo website built with a [React](https://reactjs.org/) frontend, styled
with [Tailwind CSS](https://tailwindcss.com/) and served using [Express.js](https://expressjs.com/).

It handles URL routing using [Reach Router](https://reach.tech/router/)

It uses [Google Maps' Places Autocomplete API](https://developers.google.com/maps/documentation/javascript/places-autocomplete)
for location suggestions when the user interacts with the search box.
It uses [Google Maps' Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview)
to convert arbitrary user input into a formatted address.

## Getting started

Requires:  
- [node](https://nodejs.org/en/download/) version 14.x
- npm version 7.x - `npm install npm@latest -g`

For the search box to work properly add a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) in `client/public/index.html`

```html
    <script async
      type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=<ADD API KEY HERE>&libraries=places"
    ></script>
```

To install npm packages:

`npm install && cd client && npm install && cd ..`

To run the dev server locally:

`npm run dev`

## License

MIT License

Copyright (c) 2021 Keenan Tullis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
