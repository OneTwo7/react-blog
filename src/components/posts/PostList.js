import React from 'react';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';

const PostList = ({ posts, onDeleteClick, showButton, loadMorePosts, onMouseEnter, onMouseLeave }) => (
  <div className="row">
    {
      posts.map(post => (
        <PostPreview
          key={post.id}
          post={post}
          onDeleteClick={onDeleteClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))
    }
    <div className="col-12 text-center">
      {
        showButton &&
        <button
          id="load-more-posts-btn"
          type="button"
          className="btn btn-success"
          onClick={loadMorePosts}
        >
          Load more posts
        </button>
      }
    </div>
  </div>
);

PostList.propTypes = {
  posts: PropTypes.array,
  onDeleteClick: PropTypes.func.isRequired,
  showButton: PropTypes.bool.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
};

export default PostList;
