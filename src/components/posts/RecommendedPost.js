import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecommendedPost = ({ post: { _id: id, title }, type, tag }) => (
  <div className="col-md-4">
    <div className="related-post">
      {
        type === 'tag' &&
        <div className="related-tag">Also tagged {tag}</div>
      }
      <div className="bottom">
        <h3 className="title">
          <Link to={`/posts/${id}`}>{title}</Link>
        </h3>
      </div>
    </div>
  </div>
);

RecommendedPost.propTypes = {
  post: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  tag: PropTypes.string
};

export default RecommendedPost;
