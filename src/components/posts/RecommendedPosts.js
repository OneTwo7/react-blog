import React from 'react';
import RecommendedPost from './RecommendedPost';
import PropTypes from 'prop-types';

const RecommendedPosts = ({ recommended, onLoad }) => {
  if (recommended.length) {
    return (
      <section id="related-posts" className="col-md-10 offset-md-1">
        <div className="row">
          {
            recommended.map(({ post, type, tag }) => (
              <RecommendedPost
                key={post._id}
                post={post}
                type={type}
                tag={tag}
                onLoad={onLoad}
              />
            ))
          }
        </div>
      </section>
    );
  } else {
    return null;
  }
};

RecommendedPosts.propTypes = {
  recommended: PropTypes.array.isRequired,
  onLoad: PropTypes.func.isRequired
};

export default RecommendedPosts;
