import React from 'react';
import { connect } from 'react-redux';
import PostList from './PostList';
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
    const { post, suggestedPosts } = this.props;

    return (
      <article className="post">
        <h1>{this.state.post.title}</h1>
        <p id="post-content">{this.state.post.content}</p>
        <p>Topic: {this.state.post.topic}</p>
        <p>Tags: {this.state.post.tags}</p>
        {
          !!suggestedPosts.length &&
          <div className="row">
            <div className="col-12 text-center">
              <h2>Related Posts</h2>
            </div>
            {
              suggestedPosts.map(p => (
                <div key={p.id} className="col-md-4 text-center">
                  <h3>{p.title}</h3>
                </div>
              ))
            }
          </div>
        }
      </article>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  suggestedPosts: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
  let post = {
    title: '',
    content: ''
  };
  const postId = ownProps.match.params.id;
  const { posts } = state;

  if (postId && posts.length > 0) {
    post = posts.filter(post => post.id === postId)[0];
  }

  const suggestedPosts = posts.filter(p => (
    p.topic === post.topic && p.id !== post.id
  )).slice(0, 3);

  return {
    post,
    suggestedPosts
  };
};

export default connect(mapStateToProps)(Post);
