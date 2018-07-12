import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NewPostButton = ({ auth }) => {
  if (auth && auth._id) {
    return (
      <li className="nav-item active">
        <Link className="nav-link" to="/new_post">
          New Post
        </Link>
      </li>
    );
  }
  return null;
};

NewPostButton.propTypes = {
  auth: PropTypes.object
};

export default NewPostButton;
