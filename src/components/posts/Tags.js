import React from 'react';
import PropTypes from 'prop-types';

const Tags = ({ tags, onClick}) => (
  <div id="post-tags">
    {
      tags.map((tag, idx) => (
        <button
          key={idx}
          data-index={idx}
          className="post-tag"
          type="button"
          onClick={onClick}
        >
          {tag}
        </button>
      ))
    }
  </div>
);

Tags.propTypes = {
  tags: PropTypes.array,
  onClick: PropTypes.func.isRequired
};

export default Tags;
