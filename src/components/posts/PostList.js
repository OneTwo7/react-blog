import React from 'react';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';

const PostList = ({ posts, auth, onClick, onLoad }) => (
  <div className="row">
    {
      posts.map((post, idx) => (
        <PostPreview
          key={idx}
          post={post}
          auth={auth}
          onClick={onClick}
          onLoad={onLoad}
        />
      ))
    }
  </div>
);

PostList.propTypes = {
  posts: PropTypes.array,
  auth: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired
};

export default PostList;
