import React from 'react';
import PropTypes from 'prop-types';

const ModalBody = (props) => {
  const { onChange, onKeyDown, data, login, signup, errors, send } = props;
  const { auth } = props;
  const child = React.Children.only(props.children);
  const children = [];

  if (auth && auth._id) {
    children.push(React.cloneElement(child, {
      key: 'update',
      type: 'update',
      update: props.update,
      onChange,
      onKeyDown,
      data,
      errors
    }));
    children.push(React.cloneElement(child, {
      key: 'remove',
      type: 'remove',
      remove: props.remove,
      onChange,
      onKeyDown,
      data,
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
      data,
      login,
      send,
      errors
    }));
    children.push(React.cloneElement(child, {
      key: 'signup',
      type: 'signup',
      onChange,
      onKeyDown,
      data,
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
  data: PropTypes.object,
  login: PropTypes.func,
  signup: PropTypes.func,
  errors: PropTypes.object,
  auth: PropTypes.object,
  update: PropTypes.func,
  remove: PropTypes.func,
  send: PropTypes.func
};

export default ModalBody;
