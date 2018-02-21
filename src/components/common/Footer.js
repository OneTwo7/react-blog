import React, { Component } from 'react';

class Footer extends Component {
  componentDidMount () {
    $(document).scroll(this.toggleVisibility);
    $(window).resize(this.toggleVisibility);
  }

  toggleVisibility () {
    const $upBtn = $('#up-btn');
    if ($(document).scrollTop() >= 100) {
      $upBtn.css('visibility', 'visible');
    } else {
      $upBtn.css('visibility', 'hidden');
    }
  }

  scrollUp () {
    $(window).scrollTop(0);
  }

  render () {
    return  (
      <footer className="navbar navbar-dark bg-primary fixed-bottom">
        <div className="container">
          <ul className="navbar-nav mr-auto">
            <li id="copy" className="nav-item">&copy; 2018 - Ivan Antonov</li>
          </ul>
          <button
            type="button"
            id="up-btn"
            className="btn btn-outline-light"
            onClick={this.scrollUp}
          >
            <i className="fas fa-angle-up fa-lg" />
          </button>
        </div>
      </footer>
    );
  }
}

export default Footer;
