import React from 'react';

const SocialPane = () => {
  return (
    <div
      className="tab-pane fade show active"
      id="list-social"
      role="tabpanel"
      aria-labelledby="modal-social-list"
    >
      <div className="modal-body">
        <div id="social-login">
          <a href="/auth/google" id="google-btn">
            Login with Google
          </a>
          <a href="/auth/github" id="github-btn">
            Login with Github
          </a>
          <a href="/auth/vk" id="vk-btn">
            Login with VK
          </a>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SocialPane;
