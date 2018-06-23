import React from 'react';
import PropTypes from 'prop-types';

const ModalBody = (props) => {
  const { onChange, onKeyDown, auth, login, signup, errors } = props;
  const children = React.Children.map(props.children, (child, idx) => {
    if (idx === 0) {
      return React.cloneElement(child);
    } else if (idx === 1) {
      return React.cloneElement(child, {
        onChange,
        onKeyDown,
        auth,
        login
      });
    } else {
      return React.cloneElement(child, {
        onChange,
        onKeyDown,
        auth,
        signup,
        errors
      });
    }
  });

  return <div className="tab-content">{children}</div>;
};

ModalBody.propTypes = {
  children: PropTypes.array,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  auth: PropTypes.object,
  login: PropTypes.func,
  signup: PropTypes.func,
  errors: PropTypes.object
};

export default ModalBody;
