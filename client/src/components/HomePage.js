import * as utils from '../lib/util';
import React from 'react';
import { navigate } from '@reach/router';

const google = window.google;

const HomePage = () => (
  <div className="my-40">
    <Banner />
  </div>
);

const findAddressParameters = components => {
  // todo: throw error if no components elt
  if (!components) {
    return;
  }
  let params = {};
  let i = components['length'] - 1;
  let j;
  for (; i >= 0; i--) {
    for (j = 0; j < components[i]['types']['length']; ++j) {
      switch (components[i]['types'][j]) {
        case 'postal_code':
          params['zip'] = components[i]['long_name'];
          break;
        case 'administrative_area_level_1':
          params['state'] = components[i]['long_name'];
          break;
        case 'administrative_area_level_2':
          params['county'] = components[i]['long_name'];
          break;
        case 'locality':
          params['city'] = components[i]['long_name'];
          break;
        case 'neighborhood':
          params['neighborhood'] = components[i]['long_name'];
          break;
        case 'route':
          params['street'] = components[i]['long_name'];
          break;
        case 'street_number':
          params['streetNum'] = components[i]['long_name'];
          break;
        default:
          break;
      }
    }
  }
  return params;
};

class SearchBar extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    this.queryAutocomplete = this.queryAutocomplete.bind(this);
    this.updateInputField = this.updateInputField.bind(this);
    this.checkIfEnterKeyPressed = this.checkIfEnterKeyPressed.bind(this);
    this.navigateWrapper = this.navigateWrapper.bind(this);
    this.autocompleteSetup = this.autocompleteSetup.bind(this);
    this.state = {
      redirect: false,
      apiUrl: null,
      result: null,
      queryParams: '',
      input: ''
    };
  }

  queryAutocomplete(input) {
    /* calls google geocode api on input
     * updates state.queryParams with geocode results
     * navigates to search page
     */
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        address: input,
        componentRestrictions: {
          country: 'us'
        }
      },
      (results, status) => {
        if (status === 'OK') {
          const params = findAddressParameters(
            results[0]['address_components']
          );
          if (this._isMounted) {
            this.setState({ queryParams: utils.jsonToUriParams(params) });
            this.navigateWrapper()
          }
        } else {
          console.log(
            'Geocode was not successful for the following reason: ' +
            status
          );
        }
      }
    );
  }

  componentDidMount() {
    this._isMounted = true;
    this.autocompleteSetup();
  }

  autocompleteSetup() {
    this.autocompleteInput.current.focus();
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ['geocode'], componentRestrictions: { country: 'us' } }
    );

    this.autocomplete.setFields(['address_components']);
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleOnClick = () => {
    // if query params is empty, use queryAutocomplete to infer
    if (this.state.queryParams.length === 0) {
      this.queryAutocomplete(document.getElementById('autocomplete').value);
    }
    this.navigateWrapper();
  };

  navigateWrapper() {
    let pathTarget = '';
    if (this.state.queryParams.length > 0) {
      pathTarget = `/search${this.state.queryParams}`;
      // pathTarget = `/search${this.state.queryParams}&page=1`;
      navigate(pathTarget)
    } else {
      // print
    }
  }

  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
    const components = place['address_components'];
    var result = this.autocomplete.getPlace();
    if (typeof result.address_components == 'undefined') {
      this.queryAutocomplete(result.name);
    } else {
      const params = findAddressParameters(components);
      if (this._isMounted) {
        this.setState({ queryParams: utils.jsonToUriParams(params) });
      }
    }
  }

  updateInputField() {
    const input = document.getElementById('autocomplete');
    if (this._isMounted) {
      this.setState({ input });
    }
  }

  checkIfEnterKeyPressed(e) {
    if (e.keyCode === 13) {
      this.handleOnClick();
    }
  }

  render() {
    if (this.state.redirect) {
      let pathTarget = '';
      if (this.state.queryParams.length > 0) {
        pathTarget = `/search${this.state.queryParams}`;
      } else {
        pathTarget = '/search';
      }
      navigate(pathTarget)
    }
    return (
      <div className="flex shadow">
        <input
          className="w-full p-2 rounded"
          ref={this.autocompleteInput}
          id="autocomplete"
          placeholder="Search for felines by location"
          type="text"
          onChange={this.updateInputField}
          onKeyDown={this.checkIfEnterKeyPressed}
        />
        <button
          className="flex items-center justify-end w-auto p-2 text-gray-500 bg-white hover:text-black"
          type="submit"
          onClick={this.handleOnClick}
          disabled={this.state.input.length === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    );
  }
}

const Banner = () => (
  <div className="p-16 lg:mx-80 lg:my-40">
    <p className="text-3xl">
      Find a furry friend!
    </p>
    <div className="mt-3">
      <SearchBar />
    </div>
  </div>
);

export default HomePage;
