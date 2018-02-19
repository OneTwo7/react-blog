import React from 'react';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';

const PostList = ({ posts, onDeleteClick, showButton, loadMorePosts }) => (
  <div className="row">
    {
      posts.map(post => (
        <PostPreview key={post.id} post={post} onDeleteClick={onDeleteClick} />
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
  loadMorePosts: PropTypes.func.isRequired
};

export default PostList;
