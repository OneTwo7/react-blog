import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecommended } from '../../utils/selectors';
import Post from './Post';
import RecommendedPosts from './RecommendedPosts';
import Comments from '../comments/Comments';
import PropTypes from 'prop-types';

class PostPage extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const { content } = this.props.post;
    if (content) {
      this.insertContent(content);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.post.id !== nextProps.post.id) {
      this.insertContent(nextProps.post.content);
    }
  }

  insertContent (content) {
    $('#post-content').html(content);
  }

  render () {
    const { author, post, recommended } = this.props;

    return (
      <div className="row">
        <Post author={author} post={post} />
        <RecommendedPosts recommended={recommended} />
        <Comments count={post.comments} postId={post.id} />
      </div>
    );
  }
}

PostPage.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  recommended: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
  let post = {
    id: '',
    author: '',
    title: '',
    content: '',
    category: '',
    tags: '',
    created_at: ''
  };

  const postId = ownProps.match.params.id;

  const { users } = state;
  let recommended = [];
  let author = {};
  let posts = [...state.posts];
  let postsLength = posts.length;

  if (postId && postsLength > 0) {
    // find the post and remove it from the list
    for (let i = 0; i < postsLength; i++) {
      if (posts[i].id === postId) {
        post = posts.splice(i, 1)[0];
        postsLength--;
        break;
      }
    }
    recommended = getRecommended(post, posts, postsLength);
  }

  if (post.author && users.length > 0) {
    author = users.filter(u => u.id === post.author)[0];
  }

  return {
    post,
    recommended,
    author
  };
};

export default connect(mapStateToProps)(PostPage);
