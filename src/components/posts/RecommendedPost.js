import React from 'react';
import { Link } from 'react-router-dom';
import { formatTitle } from '../../utils/formatText';
import PropTypes from 'prop-types';

const RecommendedPost = ({ post, post: { pictures }, type, tag, onLoad }) => (
  <div className="col-md-4">
    <Link to={`/posts/${post._id}`} className="post-link">
      <div className="related-post">
        <div className="post-preview-top">
          {
            !!pictures.length &&
            <img src={pictures[0].url} onLoad={onLoad} />
          }
        </div>
        <div className="bottom">
          <h3 className="post-title">{formatTitle(post.title)}</h3>
        </div>
        {
          type === 'tag' &&
          <div className="related-tag">Also tagged {tag}</div>
        }
      </div>
    </Link>
  </div>
);

RecommendedPost.propTypes = {
  post: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  tag: PropTypes.string,
  onLoad: PropTypes.func.isRequired
};

export default RecommendedPost;
