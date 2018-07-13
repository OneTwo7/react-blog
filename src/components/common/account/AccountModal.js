import React from 'react';
import AccountModalContainer from './AccountModalContainer';
import ModalHeader from './ModalHeader';
import ModalTab from './ModalTab';
import ModalBody from './ModalBody';
import ModalPane from './ModalPane';

const AccountModal = () => (
  <AccountModalContainer>
    <ModalHeader>
      <ModalTab />
    </ModalHeader>
    <ModalBody>
      <ModalPane />
    </ModalBody>
  </AccountModalContainer>
);

export default AccountModal;
