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
    console.log('AT | onerror fired...');
    if (!this.state.errored) {
      this.setState({
        src: require('../../media/panda_avatar.jpg'),
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
      greyBorder,
      caption,
      ...props
    } = this.props;

    return (
      <div className={`circ-img__container${small ? '__small' : ''}${large ? '__large' : ''} ${greyBorder && 'greyBorder'}`}>
        <img
          className="dynamic-img__img"
          src={src}
          onError={this.onError}
          {...props}
        />
        { caption && <p className="dynamic-img__caption">{caption}</p> }
      </div>
    );
  }
}

DynamicImage.propTypes = {
  src: PropTypes.string,
  small: PropTypes.bool,
  large: PropTypes.bool,
  caption: PropTypes.string,
};

export default DynamicImage;
