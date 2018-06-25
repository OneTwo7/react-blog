import React from 'react';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';

const PostList = ({ auth, posts, onDeleteClick, onLoad }) => (
  <div className="row">
    {
      posts.map((post, idx) => (
        <PostPreview
          key={idx}
          auth={auth}
          post={post}
          onClick={onDeleteClick}
          onLoad={onLoad}
        />
      ))
    }
  </div>
);

PostList.propTypes = {
  auth: PropTypes.object,
  posts: PropTypes.array,
  onDeleteClick: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired
};

export default PostList;
