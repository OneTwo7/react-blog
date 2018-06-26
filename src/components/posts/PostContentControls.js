import React from 'react';
import PropTypes from 'prop-types';

const PostContentControls = ({ id, controls, handlers, btnClass }) => (
  <div id={id}>
    {
      controls.map(({ type, id, text }, idx) => (
        <button
          key={idx}
          type="button"
          id={id}
          onClick={handlers[type]}
          className={btnClass[type]}
        >
          {text}
        </button>
      ))
    }
  </div>
);

PostContentControls.propTypes = {
  id: PropTypes.string.isRequired,
  controls: PropTypes.array.isRequired,
  handlers: PropTypes.object.isRequired,
  btnClass: PropTypes.object.isRequired
};

export default PostContentControls;
