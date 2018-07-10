import React from 'react';
import PropTypes from 'prop-types';

const ModalBody = (props) => {
  const { onChange, onKeyDown, auth, login, signup, errors, user } = props;
  const child = React.Children.only(props.children);
  const children = [];

  if (user && user._id) {
    children.push(React.cloneElement(child, {
      key: 'modify',
      type: 'modify',
      update: props.update,
      onChange,
      onKeyDown,
      auth,
      errors,
      user
    }));
    children.push(React.cloneElement(child, {
      key: 'delete',
      type: 'delete',
      remove: props.remove,
      onChange,
      onKeyDown,
      auth,
      errors
    }));
  } else {
    children.push(React.cloneElement(child, {
      key: 'social',
      type: 'social'
    }));
    children.push(React.cloneElement(child, {
      key: 'login',
      type: 'login',
      onChange,
      onKeyDown,
      auth,
      login,
      errors
    }));
    children.push(React.cloneElement(child, {
      key: 'signup',
      type: 'signup',
      onChange,
      onKeyDown,
      auth,
      signup,
      errors
    }));
  }

  return <div className="tab-content">{children}</div>;
};

ModalBody.propTypes = {
  children: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  auth: PropTypes.object,
  login: PropTypes.func,
  signup: PropTypes.func,
  errors: PropTypes.object,
  user: PropTypes.object,
  update: PropTypes.func,
  remove: PropTypes.func
};

export default ModalBody;
