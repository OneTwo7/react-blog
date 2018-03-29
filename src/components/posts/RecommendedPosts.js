import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const renderPosts = (recommended) => {
  return recommended.map(({ post, type, tag }) => (
    <div key={post._id} className="col-md-4">
      <div className="related-post">
        {
          type === 'tag' &&
          <div className="related-tag">Also tagged {tag}</div>
        }
        <div className="bottom">
          <h3 className="title">
            <Link to={`/posts/${post._id}`}>
              {post.title}
            </Link>
          </h3>
        </div>
      </div>
    </div>
  ));
};

const RecommendedPosts = ({ recommended }) => (
  <section id="related-posts" className="col-md-10 offset-md-1">
    <div className="row">{renderPosts(recommended)}</div>
  </section>
);

RecommendedPosts.propTypes = {
  recommended: PropTypes.array
};

export default RecommendedPosts;
