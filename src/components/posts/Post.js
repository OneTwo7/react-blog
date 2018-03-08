import React from 'react';
import { connect } from 'react-redux';
import { getRecommended } from '../../utils/selectors';
import PostContent from './PostContent';
import RecommendedPosts from './RecommendedPosts';
import Comments from '../comments/Comments';
import PropTypes from 'prop-types';

const Post = ({ post, recommended, author }) => (
  <div className="row">
    <PostContent author={author} post={post} />
    <RecommendedPosts recommended={recommended} />
    <Comments count={post.comments} postId={post.id} />
  </div>
);

Post.propTypes = {
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

export default connect(mapStateToProps)(Post);
