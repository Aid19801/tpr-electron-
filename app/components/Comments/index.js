import React, { Component } from 'react';
import Comment from '../Comment';

class Comments extends Component {
  render() {
    console.log('AT | comments ', this.props.comments);
    return (
      <section className="section">
        {
          this.props.comments.map((comment, index) => {
            return <Comment key={index} comment={comment} />
          })
        }
      </section>
    );
  }
}

export default Comments;
