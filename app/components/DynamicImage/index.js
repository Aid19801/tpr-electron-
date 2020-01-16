import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class DynamicImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      src: props.src,
      errored: false,
    };
  }

  onError = () => {
    if (!this.state.errored) {
      this.setState({
        src: this.props.fallbackSrc,
        errored: true,
      });
    }
  }

  componentWillReceiveProps(newProps, newState) {
    if (newProps.src !== this.props.src) {
      return this.setState({ src: newProps.src });
    } else {
      return;
    }
  }

  render() {
    const { src } = this.state;
    const {
      small,
      large,
      src: _1,
      fallbackSrc: _2,
      ...props
    } = this.props;

    return (
      <div className={`circ-img__container${small && '__small'} ${large && 'large'}`}>
        <img
          className="dynamic-img__img"
          src={src}
          onError={this.onError}
          {...props}
        />
      </div>
    );
  }
}

DynamicImage.propTypes = {
  src: PropTypes.string,
  small: PropTypes.string,
  large: PropTypes.string,
  fallbackSrc: PropTypes.string,
};

export default DynamicImage;
