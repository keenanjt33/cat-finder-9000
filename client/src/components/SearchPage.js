import React from 'react';
import { navigate } from '@reach/router';
import * as queryString from 'query-string';
import RefineSearchWidget from './RefineSearchWidget';

class SearchPage extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    const urlParams = queryString.parse(this.props.location.search);
    this.state = {
      cats: null,
      catsUnfiltered: null,
      pageNumber:
        urlParams['page']
          ? parseInt(urlParams['page'])
          : 1,
      selectedCatIndex: null,
      redirect: false,
      queryParams: this.props.location.search,
      sortBy: 0,
      appliedFilters: {},
      loading: false
    };
    this.numPages = 0;
    this.thumbnailIndex = 0;
    this.rowIndex = 0;
    this.onThumbnailSelection = this.onThumbnailSelection.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.updateCats = this.updateCats.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.search !== prevProps.location.search) {
      const urlParams = queryString.parse(this.props.location.search);
      this.setState({
        queryParams: this.props.location.search,
        pageNumber: urlParams['page']
          ? parseInt(urlParams['page'])
          : 1
      }, this.fetchData);
    }
  }
  handleFilterChange(filterKey, filterValue) {
    let queryObj = queryString.parse(this.state.queryParams);
    if (filterValue === undefined) {
      delete queryObj[filterKey];
    } else {
      queryObj[filterKey] = filterValue;
    }
    const queryParams = '?' + queryString.stringify(queryObj);
    if (this._isMounted) {
      this.setState({ queryParams }, this.fetchData);
    }
    navigate(`/search/?${queryString.stringify(queryObj)}`);
  }
  handleSortChange(e) {
    let queryObj = queryString.parse(this.state.queryParams);
    queryObj['sortBy'] = e.target.value;
    const queryParams = '?' + queryString.stringify(queryObj);
    if (this._isMounted) {
      this.setState({ queryParams }, this.fetchData);
    }
    navigate(`/search/?${queryParams}`);
  }
  handleNext() {
    window.scrollTo(0, 0);
    const parsed = queryString.parse(this.state.queryParams);
    if (parsed['page']) {
      parsed['page']++;
    } else {
      parsed['page'] = 2; // assume it was 1
    }
    const stringified = '?' + queryString.stringify(parsed);
    if (this._isMounted) {
      this.setState((state) => ({
          queryParams: stringified , pageNumber: state.pageNumber + 1
        }) , this.fetchData);
    }
    navigate(`/search${stringified}`);
  }
  handlePrevious() {
    window.scrollTo(0, 0);
    const parsed = queryString.parse(this.state.queryParams);
    if (parsed['page'] > 1) {
      parsed['page']--;
    } else {
      parsed['page'] = 1;
    }
    const stringified = '?' + queryString.stringify(parsed);
    if (this._isMounted) {
      this.setState((state) => ({
          queryParams: stringified, pageNumber: state.pageNumber - 1
        }) , this.fetchData);
    }
    navigate(`/search${stringified}`);
  }
  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  fetchData() {
    this.setState({ loading: true });
    // const { email, password } = this.state;
    this.thumbnailIndex = 0;
    let apiUrl = `/api/search${this.state.queryParams}`;
    fetch(apiUrl)
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (!json) {
          console.log('error: no response');
        }
        if (this._isMounted) {
          this.setState({ cats: json, catsUnfiltered: json, numPages: Math.ceil(json.length / 12) });
          this.setState({ loading: false });
        }
      })
      .catch(error => console.log(error));
  }
  onThumbnailSelection(index) {
    const targetUrl = `/cat/${this.state.cats[index].id}`;
    navigate(targetUrl, {
      state: {
        featureImageURL: this.state.cats[index].image,
        price: this.state.cats[index].formattedPrice,
        address: this.state.cats[index].address,
      }
    });
  }
  updateCats(newCats) {
    this.setState({ cats: newCats, numPages: Math.ceil(newCats.length / 12) });
  }
  render() {
    if (this.state.redirect) {
      const targetUrl = `/cat/${
        this.state.cats[this.state.selectedCatIndex]
          .field_Matrix_Unique_ID
      }`;
      navigate(targetUrl);
      return null;
    }

    const { cats, pageNumber } = this.state;
    let results = null;
    if (cats && cats.length) {
      let l = (pageNumber - 1) * 12;
      let r = l + 12 < cats.length ? l + 12 : cats.length;
      results = (
        <div
          className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-10 sm:mx-10 lg:mx-30 xl:mx-50"
        >
          {cats.slice(l, r).map((cat, i, arr) => (
            <Thumbnail
              catData={cat}
              index={i}
              handleSelect={this.onThumbnailSelection}
              key={`thumbnail-cat-id-${cat.id}`}
            />
          ))}
        </div>
      );
    } else {
      results = (<em>No results found</em>)
    }
    return (
      <div
        className="py-20 bg-gray-200"
        // style={{ maxWidth: '1200px', marginTop: '100px' }}
      >
        <RefineSearchWidget
          queryParams={this.state.queryParams}
          handleFilterChange={this.handleFilterChange}
          handleSortChange={this.handleSortChange}
          updateCats={this.updateCats}
          cats={this.state.catsUnfiltered}
        />
        {this.state.loading && <div>Loading...</div>}
        {results}
        <div className="flex justify-center mt-5 content-evenly lg:mx-20">
          {this.state.pageNumber > 1 &&
            <button
              className="px-8 py-2 border-2 rounded shadow-inner border-secondary hover:bg-secondary"
              onClick={this.handlePrevious}
            >
              Previous
            </button>
          }
          {this.state.pageNumber < this.state.numPages &&
            <button
              className="px-8 py-2 border-2 rounded shadow-inner border-secondary hover:bg-secondary"
              onClick={this.handleNext}
            >
              Next
            </button>
          }
        </div>
      </div>
    );
  }
}

class Thumbnail extends React.Component {
  render() {
    return (
      <div
        className="overflow-hidden border-2 border-gray-300 cursor-pointer rounded-2xl card hover:shadow-lg hover:bg-white"
        onClick={() => this.props.handleSelect(this.props.index)}
      >
        <img
          className="object-cover w-full h-64 md:h-48 lg:h-64"
          src={this.props.catData.thumbnail}
          alt="Cat"
        />
        <div className="m-4">
          <span className="font-bold">{this.props.catData.name}</span>
          <span className="block text-sm text-gray-500">
            {this.props.catData.address}
          </span>
        </div>
      </div>
    );
  }
}

export default SearchPage;
