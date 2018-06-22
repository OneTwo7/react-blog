import React from 'react';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';

const PostList = ({ posts, onDeleteClick, onLoad }) => (
  <div className="row">
    {
      posts.map((post, idx) => (
        <PostPreview
          key={idx}
          post={post}
          onClick={onDeleteClick}
          onLoad={onLoad}
        />
      ))
    }
  </div>
);

PostList.propTypes = {
  posts: PropTypes.array,
  onDeleteClick: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired
};

export default PostList;
