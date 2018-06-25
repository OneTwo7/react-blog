import React from 'react';
import LoginModalContainer from './LoginModalContainer';
import ModalHeader from './ModalHeader';
import ModalTab from './ModalTab';
import ModalBody from './ModalBody';
import ModalPane from './ModalPane';
import PropTypes from 'prop-types';

const LoginModal = (props) => (
  <LoginModalContainer {...props}>
    <ModalHeader>
      <ModalTab />
      <ModalTab />
      <ModalTab />
    </ModalHeader>
    <ModalBody>
      <ModalPane />
      <ModalPane />
      <ModalPane />
    </ModalBody>
  </LoginModalContainer>
);

LoginModal.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default LoginModal;
