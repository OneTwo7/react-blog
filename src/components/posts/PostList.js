import React from 'react';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';

const PostList = ({ posts, onDeleteClick }) => (
  <div className="row">
    {
      posts.map((post, idx) => (
        <PostPreview
          key={idx}
          post={post}
          onDeleteClick={onDeleteClick}
        />
      ))
    }
  </div>
);

PostList.propTypes = {
  posts: PropTypes.array,
  onDeleteClick: PropTypes.func.isRequired
};

export default PostList;
