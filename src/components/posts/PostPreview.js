import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import strings from '../../strings/components/posts/postPreview';

const PostPreview = ({ lang, post, auth, onClick, onLoad }) => {
  const { _id, author, title, pictures } = post;

  return (
    <div className="post-wrapper col-md-4">
      <Link to={`/posts/${_id}`} className="post-link">
        <div id={_id} className="post-preview">
          <div className="post-preview-top">
            {
              !!pictures.length &&
              <img src={pictures[0].url} onLoad={onLoad} />
            }
          </div>
          <div className="post-preview-bottom">
            <h2 className="post-title">{title}</h2>
          </div>
        </div>
      </Link>
      {
        auth && auth._id === author._id &&
        <div className="post-controls">
          <Link to={`/posts/${_id}/edit`}>
            {strings[lang].edit}
          </Link>
          <button
            data-target={_id}
            type="button"
            className="btn btn-link"
            onClick={onClick}
          >
            {strings[lang].remove}
          </button>
        </div>
      }
    </div>
  );
};

PostPreview.propTypes = {
  auth: PropTypes.object,
  lang: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired
};

export default PostPreview;
