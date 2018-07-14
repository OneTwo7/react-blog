import React from 'react';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';

const PostList = ({ posts, auth, lang, onClick, onLoad }) => (
  <div className="row">
    {
      posts.map((post, idx) => (
        <PostPreview
          key={idx}
          lang={lang}
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
  lang: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired
};

export default PostList;
