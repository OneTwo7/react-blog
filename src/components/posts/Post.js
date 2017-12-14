import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Post extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      post: Object.assign({}, props.post)
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.post.id !== nextProps.post.id) {
      this.setState({ post: Object.assign({}, nextProps.post) });
    }
  }

  render () {
    const { post } = this.props;

    return (
      <article className="post">
        <h1>{this.state.post.title}</h1>
        <p>{this.state.post.content}</p>
      </article>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let post = {
    title: '',
    content: ''
  };
  const postId = ownProps.match.params.id;

  if (postId && state.posts.length > 0) {
    post = state.posts.filter(post => post.id === postId)[0];
  }

  return {
    post
  };
};

export default connect(mapStateToProps)(Post);
