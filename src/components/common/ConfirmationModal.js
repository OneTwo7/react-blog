import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationModal = ({ confirm, message, id }) => (
  <div
    className="modal fade confirmation-modal"
    id={id || "confirmation-modal"}
    tabIndex="-1"
    role="dialog"
    aria-labelledby="confirmationModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-body">
          <div>{message || 'Are you sure you want to delete this?'}</div>
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
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={confirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
);

ConfirmationModal.propTypes = {
  confirm: PropTypes.func.isRequired,
  message: PropTypes.string,
  id: PropTypes.string
};

export default ConfirmationModal;
