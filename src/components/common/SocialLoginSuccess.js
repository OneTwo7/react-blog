import React, { Component } from 'react';

class SocialLoginSuccess extends Component {
  componentDidMount() {
    window.opener.focus();
    window.close();
  }

  render() {
    return null;
  }
}

export default SocialLoginSuccess;
