import React from 'react';
import { Component } from 'react';
import ImageCarousel from './ImageCarousel';

class CatPage extends Component {
  constructor(props) {
    super(props);
    let images = [];
    this.state = {
      modalIsOpen: false,
      currentIndex: 0,
      images,
      catData: undefined,
      imageCount: 'loading'
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    const catId = this.props.catId;
    fetch(`/api/cat?catId=${catId}`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({ catData: json });
      })
      .catch(error => console.log(error));
    fetch('/api/images')
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({ images: json, imageCount: json.length });
      })
      .catch(error => console.log(error));
  }

  toggleModal() {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  render() {
    let {
      name = '',
      address = '',
      numWhiskers = '',
      age = '',
      personality = '',
    } = this.state.catData || {};
    const ageText = age + ' · ';
    const personalityText = personality + ' · ';
    const whiskerText = numWhiskers + ' whiskers';
    const catAscii =
`   /\\_/\\
  ( o.o )
   > ^ <`;
    return (
      <div>
        <div className=""></div>
        <div
          className=""
          // style={{ marginLeft: '260px' }}
        >
          <div className="">
            {this.state.images.length > 0 && (
              <ImageCarousel
                images={this.state.images}
                imageCount={this.state.imageCount}
              />
            )}
          </div>
          <div className="mb-20 xl:mx-80 lg:mx-40 md:mx-20 sm:mx-10">
            <h2 className="text-4xl font-bold">{name}</h2>
            <h3 className="my-2 text-xl"><em>{address}</em></h3>
            <h3 className="my-1 text-lg">{ageText + personalityText + whiskerText}</h3>
            <p className="mt-10 mb-2">Listing provided courtesy of:</p>
            <pre>{catAscii}</pre>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default CatPage;
