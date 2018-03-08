import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const renderPosts = (recommended) => {
  return recommended.map(p => (
    <div key={p.post.id} className="col-md-4">
      <div className="related-post">
        {p.type === 'tag' && <div>Also tagged {p.tag}</div>}
        <div className="bottom">
          <h3 className="title">
            <Link to={`/posts/${p.post.id}`}>
              {p.post.title}
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
