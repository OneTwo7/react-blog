import React from 'react';
import PropTypes from 'prop-types';
import strings from '../../../strings/components/common/modals/confirmation';

const ConfirmationModal = ({ message, id, confirm, lang }) => (
  <div
    className="modal fade confirmation-modal"
    id={id}
    tabIndex="-1"
    role="dialog"
    aria-labelledby="confirmationModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-body">
          <div>{message}</div>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            {strings[lang].close}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={confirm}
          >
            {strings[lang].confirm}
          </button>
        </div>
      </div>
    </div>
  </div>
);

ConfirmationModal.propTypes = {
  message: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired
};

export default ConfirmationModal;
