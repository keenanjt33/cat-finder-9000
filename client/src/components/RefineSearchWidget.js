import React from 'react';
import * as queryString from 'query-string';
import { SORT_OPTIONS, PERSONALITY_DEFAULT, AGE_DEFAULT, NUM_WHISKERS } from '../lib/globals';

class RefineSearchWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: [false, false, false, false, false],
      queryObj: queryString.parse(this.props.queryParams),
      displayIndex: null,
      sortIndex: 0,
      personality: PERSONALITY_DEFAULT,
      age: AGE_DEFAULT,
      minWhiskersIndex: 0,
      maxWhiskersIndex: 0,
    };
    this.updateResults = this.updateResults.bind(this);
    this.handleDisplayToggle = this.handleDisplayToggle.bind(this);
    this.sortByHandler = this.sortByHandler.bind(this);
    this.personalityHandler = this.personalityHandler.bind(this);
    this.personalityRemoveHandler = this.personalityRemoveHandler.bind(this);
    this.ageHandler = this.ageHandler.bind(this);
    this.ageRemoveHandler = this.ageRemoveHandler.bind(this);
    this.minWhiskerHandler = this.minWhiskerHandler.bind(this);
    this.maxWhiskerHandler = this.maxWhiskerHandler.bind(this);
    this.filterCardGenerator = this.filterCardGenerator.bind(this);
    this.selectionHandlerWrapper = this.selectionHandlerWrapper.bind(this);
    this.ageValueChecker = this.ageValueChecker.bind(this);
    this.personalityValueChecker = this.personalityValueChecker.bind(this);
  }

  updateResults() {
    let filtered = this.props.cats.filter((cat) => {
      if (this.state.minWhiskersIndex > 0) {
        const min = NUM_WHISKERS[this.state.minWhiskersIndex];
        if (cat.numWhiskers < min) return false;
      }
      if (this.state.maxWhiskersIndex > 0) {
        const max = NUM_WHISKERS[this.state.maxWhiskersIndex];
        if (cat.numWhiskers > max) return false;
      }
      if (!this.state.personality['Any']) {
        if (!this.state.personality[cat.personality]) return false;
      }
      if (!this.state.age['Any']) {
        if (!this.state.age[cat.age]) return false;
      }
      return true;
    });
    // sort
    if (this.state.sortIndex === 1) {
      // high low
      filtered.sort((l, r) => {
        return l.numWhiskers < r.numWhiskers
      });
    } else if (this.state.sortIndex === 2) {
      // low high
      filtered.sort((l, r) => {
        return l.numWhiskers > r.numWhiskers
      });
    }
    this.props.updateCats(filtered);
  }

  handleDisplayToggle(dropdownIndex = undefined) {
    // e.preventDefault();
    if (dropdownIndex !== undefined)
      if (this.state.display[dropdownIndex]) {
        // make all false
        this.setState({
          display: this.state.display.fill(false)
        });
      } else {
        let updated = this.state.display.fill(false);
        updated[dropdownIndex] = true;
        this.setState({ display: updated });
      }
  }

  sortByHandler(rowIndex) {
    this.setState({ sortIndex: rowIndex }, this.updateResults);
  }

  minWhiskerHandler(rowIndex) {
    this.setState({ minWhiskersIndex: rowIndex }, this.updateResults);
  }

  maxWhiskerHandler(rowIndex) {
    this.setState({ maxWhiskersIndex: rowIndex }, this.updateResults);
  }

  personalityHandler(key) {
    let updated = this.state.personality;
    if (key === 'Any') {
      // set all to false except any
      for (const key of Object.keys(this.state.personality)) {
        updated[key] = false;
      }
      updated['Any'] = true;
    }
    else {
      // toggle key
      updated[key] = !updated[key];
      updated['Any'] = false;
    }
    this.setState({ personality: updated }, this.updateResults);
  }

  personalityRemoveHandler(key) {
    let updated = this.state.personality;
    // toggle key
    updated[key] = false;
    updated['Any'] = true;
    for (const value of Object.values(updated)) {
      if (value === true) updated['Any'] = false;
    }
    this.setState({ personality: updated }, this.updateResults);
  }

  ageRemoveHandler(key) {
    let updated = this.state.age;
    updated[key] = false;
    updated['Any'] = true;
    for (const value of Object.values(updated)) {
      if (value === true) updated['Any'] = false;
    }
    this.setState({ age: updated }, this.updateResults);
  }

  ageHandler(key) {
    let updated = this.state.age;
    if (key === 'Any') {
      // set all to false except any
      for (const key of Object.keys(this.state.age)) {
        updated[key] = false;
      }
      updated['Any'] = true;
    }
    else {
      updated[key] = !updated[key];
      updated['Any'] = false;
    }
    this.setState({ age: updated }, this.updateResults);
  }

  filterCardGenerator() {
    let cardProps = [];
    if (!this.state.personality['Any']) {
      for (const [key, value] of Object.entries(this.state.personality)) {
        if (value) cardProps.push({
          text: key,
          handleRemove: () => this.personalityRemoveHandler(key)
        });
      }
    }
    if (!this.state.age['Any']) {
      for (const [key, value] of Object.entries(this.state.age)) {
        if (value) cardProps.push({
          text: key,
          handleRemove: () => this.ageRemoveHandler(key)
        });
      }
    }
    if (this.state.minWhiskersIndex !== 0) cardProps.push({
      text: '>=' + NUM_WHISKERS[this.state.minWhiskersIndex] + ' whiskers',
      handleRemove: () => this.minWhiskerHandler(0),
    }
    );
    if (this.state.maxWhiskersIndex !== 0) cardProps.push({
      text: '<=' + NUM_WHISKERS[this.state.maxWhiskersIndex] + ' whiskers',
      handleRemove: () => this.maxWhiskerHandler(0),
    });
    return (
      cardProps.map((props) =>
        <FilterCard
          text={props.text}
          handleRemove={props.handleRemove}
          key={`filter-card-${props.text}`}
        />
      )
    );
  }

  selectionHandlerWrapper(toCall, toCallArg, displayToggleYN, dropdownIndex) {
    if (displayToggleYN) {
      this.handleDisplayToggle(dropdownIndex);
    }
    toCall(toCallArg);
  }

  ageValueChecker(val) {
    return this.state.age[val] && <Check />
  }

  personalityValueChecker(val) {
    return this.state.personality[val] && <Check />
  }

  render() {
    return (
      <div className='mx-10 md:col-span-3'>
        Filter Results:
        <div className='mb-10 text-black'>
          <DropdownButton
            buttonText={'Sort By'}
            dropdownIndex={0}
            dropdownValues={Object.values(SORT_OPTIONS)}
            display={this.state.display[0]}
            handleDisplayToggle={this.handleDisplayToggle}
            selectionHandler={this.sortByHandler}
            multipleSelection={false}
            autoClose={true}
            selectionHandlerWrapper={this.selectionHandlerWrapper}
            sortByHighlight={SORT_OPTIONS[this.state.sortIndex]}
          />
          <DropdownButton
            buttonText={'Personality'}
            dropdownIndex={1}
            dropdownValues={Object.keys(PERSONALITY_DEFAULT)}
            display={this.state.display[1]}
            handleDisplayToggle={this.handleDisplayToggle}
            selectionHandler={this.personalityHandler}
            multipleSelection={true}
            autoClose={false}
            selectionHandlerWrapper={this.selectionHandlerWrapper}
            sortByHighlight={null}
            checkGenerator={this.personalityValueChecker}
          />
          <DropdownButton
            buttonText={'Age'}
            dropdownIndex={2}
            dropdownValues={Object.keys(AGE_DEFAULT)}
            display={this.state.display[2]}
            handleDisplayToggle={this.handleDisplayToggle}
            selectionHandler={this.ageHandler}
            multipleSelection={true}
            autoClose={false}
            selectionHandlerWrapper={this.selectionHandlerWrapper}
            sortByHighlight={null}
            checkGenerator={this.ageValueChecker}
          />
          <DropdownButton
            buttonText={'Min Whiskers'}
            dropdownIndex={3}
            dropdownValues={NUM_WHISKERS}
            display={this.state.display[3]}
            handleDisplayToggle={this.handleDisplayToggle}
            selectionHandler={this.minWhiskerHandler}
            multipleSelection={false}
            autoClose={true}
            selectionHandlerWrapper={this.selectionHandlerWrapper}
            sortByHighlight={null}
          />
          <DropdownButton
            buttonText={'Max Whiskers'}
            dropdownIndex={4}
            dropdownValues={NUM_WHISKERS}
            display={this.state.display[4]}
            handleDisplayToggle={this.handleDisplayToggle}
            selectionHandler={this.maxWhiskerHandler}
            multipleSelection={false}
            autoClose={true}
            selectionHandlerWrapper={this.selectionHandlerWrapper}
            sortByHighlight={null}
          />
        </div>
        <div className='mt-5'>
          {this.filterCardGenerator()}
        </div>
      </div>
    );
  }
}


const FilterCard = props => {
  return(
    <div className='inline-block p-1 px-3 mr-3 rounded bg-secondary'>
      {props.text}
      <svg onClick={props.handleRemove} xmlns='http://www.w3.org/2000/svg' className='inline-block w-5 h-5 mb-1 ml-2 text-gray-800 cursor-pointer hover:text-black' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
      </svg>
    </div>
  );
};

const DropdownButton = props => {
  return (
    <div className='inline-block mt-4 mr-4'>
      <button
        onClick={() => props.handleDisplayToggle(props.dropdownIndex)}
        className='py-2 bg-purple-300 rounded shadow-inner px-7 '
      >
        {props.buttonText}
        <svg xmlns='http://www.w3.org/2000/svg' className='inline-block w-8 h-8 pl-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>
      <div className='absolute bg-white rounded shadow-md pin-t pin-l'>
        {props.display && (
          props.dropdownValues.map((val, i, arr) => { return (
            <div
              className={`px-4 py-2 pr-20 text-black cursor-pointer hover:bg-gray-300 ${props.sortByHighlight === val && 'bg-secondary'}`}
              onClick={() => props.multipleSelection
                ? props.selectionHandlerWrapper(props.selectionHandler, val, props.autoClose, props.dropdownIndex)
                : props.selectionHandlerWrapper(props.selectionHandler, i, props.autoClose, props.dropdownIndex)
              }
              key={`${props.buttonText}-${val}`}
            >
              {val}{props.multipleSelection && props.checkGenerator(val)}
            </div>
          )})
        )}
      </div>
    </div>
  );
};

const Check = () =>
  <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-0 inline-block w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>

export default RefineSearchWidget;
