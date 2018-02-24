import React from 'react';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';

const PostList = ({ posts, onDeleteClick, onMouseEnter, onMouseLeave }) => (
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
  </div>
);

PostList.propTypes = {
  posts: PropTypes.array,
  onDeleteClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
};

export default PostList;
