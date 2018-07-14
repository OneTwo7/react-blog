import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import strings from '../../../strings/components/common/navbar/newPostButton';

const NewPostButton = ({ auth, lang }) => {
  if (auth && auth._id) {
    return (
      <li className="nav-item active">
        <Link className="nav-link" to="/new_post">
          {strings[lang].newPost}
        </Link>
      </li>
    );
  }
  return null;
};

NewPostButton.propTypes = {
  auth: PropTypes.object,
  lang: PropTypes.string.isRequired
};

export default NewPostButton;
