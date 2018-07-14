import React from 'react';
import { Link } from 'react-router-dom';
import { formatTitle } from '../../utils/formatText';
import PropTypes from 'prop-types';
import strings from '../../strings/components/posts/recommendedPost';

const RecommendedPost = ({ lang, post, type, tag, onLoad }) => (
  <div className="col-md-4 offset-md-0 col-sm-10 offset-sm-1">
    <Link to={`/posts/${post._id}`} className="post-link">
      <div className="related-post">
        <div className="post-preview-top">
          {
            !!post.pictures.length &&
            <img src={post.pictures[0].url} onLoad={onLoad} />
          }
        </div>
        <div className="bottom">
          <h3 className="post-title">{formatTitle(post.title)}</h3>
        </div>
        {
          type === 'tag' &&
          <div className="related-tag">{`${strings[lang].tag} ${tag}`}</div>
        }
      </div>
    </Link>
  </div>
);

RecommendedPost.propTypes = {
  lang: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  tag: PropTypes.string,
  onLoad: PropTypes.func.isRequired
};

export default RecommendedPost;
