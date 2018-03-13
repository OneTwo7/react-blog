import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ProgressBar = ({ loading }) => (
  <div>
    {
      loading &&
      <div id="shadow">
        <i id="cog" className="fas fa-cog fa-spin" />
      </div>
    }
  </div>
);

ProgressBar.propTypes = {
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
};

export default connect(mapStateToProps)(ProgressBar);
