import React from 'react';
import AccountModalContainer from './AccountModalContainer';
import ModalHeader from './ModalHeader';
import ModalTab from './ModalTab';
import ModalBody from './ModalBody';
import ModalPane from './ModalPane';
import PropTypes from 'prop-types';

const AccountModal = (props) => (
  <AccountModalContainer {...props}>
    <ModalHeader>
      <ModalTab />
    </ModalHeader>
    <ModalBody>
      <ModalPane />
    </ModalBody>
  </AccountModalContainer>
);

AccountModal.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
  auth: PropTypes.object
};

export default AccountModal;
