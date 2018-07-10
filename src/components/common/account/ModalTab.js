import React from 'react';
import PropTypes from 'prop-types';

const ModalTab = ({ active, text, tab }) => (
  <a
    className={`list-group-item list-group-item-action${active}`}
    id={`modal-${tab}-list`}
    data-toggle="list"
    href={`#list-${tab}`}
    aria-controls={tab}
  >
    {text}
  </a>
);

ModalTab.propTypes = {
  active: PropTypes.string,
  text: PropTypes.string,
  tab: PropTypes.string
};

export default ModalTab;
