import React from 'react';
import PropTypes from 'prop-types';
import AccountContext from '../AccountContext';

const UNLOGGED_TABS = ['social', 'login', 'signup'];
const LOGGED_TABS = ['update', 'remove'];

const ModalTab = ({ active, text, tab }) => {
  const element = (
    <a
      className={`list-group-item list-group-item-action${
        tab === UNLOGGED_TABS[0] || tab === LOGGED_TABS[0] ? ' active' : ''
      }`}
      id={`modal-${tab}-list`}
      data-toggle="list"
      href={`#list-${tab}`}
      aria-controls={tab}
    >
      {text}
    </a>
  );

  return (
    <AccountContext.Consumer>
      {({ auth }) => {
        if (auth && auth._id) {
          if (LOGGED_TABS.includes(tab)) {
            return element;
          } else {
            return null;
          }
        } else {
          if (UNLOGGED_TABS.includes(tab)) {
            return element;
          } else {
            return null;
          }
        }
      }}
    </AccountContext.Consumer>
  );
};

ModalTab.propTypes = {
  active: PropTypes.string,
  text: PropTypes.string,
  tab: PropTypes.string
};

export default ModalTab;
