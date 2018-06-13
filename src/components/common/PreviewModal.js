import React from 'react';

const close = () => {
  $('#preview-modal').modal('hide');
};

const PreviewModal = () => (
  <div
    className="modal fade"
    id="preview-modal"
    tabIndex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content" onClick={close}>
        <div className="modal-body" />
      </div>
    </div>
  </div>
);

export default PreviewModal;
