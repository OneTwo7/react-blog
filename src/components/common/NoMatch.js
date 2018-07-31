import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import strings from '../../strings/components/common/noMatch';
import PropTypes from 'prop-types';

const NoMatch = ({ lang }) => (
  <div id="no-match" className="jumbotron">
    <h1>{ strings[lang].header }</h1>
    <p>{ strings[lang].paragraph }</p>
    <Link to="/" className="btn btn-primary">{ strings[lang].link }</Link>
  </div>
);

NoMatch.propTypes = {
  lang: PropTypes.string
};

const mapStateToProps = ({ lang }) => ({ lang });

 export default connect(mapStateToProps)(NoMatch);
