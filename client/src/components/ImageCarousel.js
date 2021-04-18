import React from 'react';

class ImageCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0
    };
    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
  }

  previousSlide() {
    const lastIndex = this.props.images.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

    this.setState({
      currentImageIndex: index
    });
  }

  nextSlide() {
    const lastIndex = this.props.images.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;

    this.setState({
      currentImageIndex: index
    });
  }

  render() {
    const url = this.props.images[this.state.currentImageIndex];
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="carousel">
          {this.props.images.length && <img alt="property" src={url} />}
          <p className="pr-10 my-1 text-right">
            <em>Image: {this.state.currentImageIndex + 1} / {this.props.imageCount}</em>
          </p>
          <Arrow
            direction="left"
            clickFunction={this.previousSlide}
            glyph="&#10094;"
          />
          <Arrow
            direction="right"
            clickFunction={this.nextSlide}
            glyph="&#10095;"
          />
        </div>
      </div>
    );
  }
}

const Arrow = ({ direction, clickFunction, glyph }) => (
  <div className={`slide-arrow ${direction}`} onClick={clickFunction}>
    {glyph}
  </div>
);

export default ImageCarousel;
