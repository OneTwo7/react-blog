import React from 'react';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';

const makeTitle = () => {
  insertElement('title');
};

const makeLink = () => {
  insertElement('link');
};

const makeBold = () => {
  insertElement('bold');
};

const makeCursive = () => {
  insertElement('cursive');
};

const getSelectedText = () => {
  const text = getSelection();
  if (text.length === 0) {
    NotificationManager.error('Wrong selection!');
    return;
  }
  return text;
};

const getSelection = () => {
  const selection = window.getSelection();
  const anchor = selection.anchorNode;
  if (!anchor || anchor.nodeType !== 3) {
    return '';
  }

  let parent = anchor.parentNode;

  while (parent.nodeName === 'DIV') {
    if (parent.id === 'content') {
      return selection.toString();
    }
    parent = parent.parentNode;
  }
  return '';
};

const insertElement = (type) => {
  const text = getSelectedText();
  if (!text) {
    return;
  }
  let element;
  let url;

  switch (type) {
    case 'title':
      element = `<h2>${text}</h2>`;
      break;
    case 'link':
      url = prompt('Give me a utl', '');
      element = `<a href="${url}">${text}</a>`;
      break;
    case 'bold':
      element = `<strong>${text}</strong>`;
      break;
    case 'cursive':
      element = `<em>${text}</em>`;
      break;
    default:
      return;
  }
  document.execCommand('insertHTML', false, element);
};

const PostContent = ({ label }) => (
  <div className="form-group">
    <label>{label}</label>
    <div
      id="content"
      contentEditable="true"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    />
    <button type="button" onClick={makeTitle}>Title</button>
    <button type="button" onClick={makeLink}>Link</button>
    <button type="button" onClick={makeBold}>Bold</button>
    <button type="button" onClick={makeCursive}>Cursive</button>
  </div>
);

PostContent.propTypes = {
  label: PropTypes.string
};

export default PostContent;
