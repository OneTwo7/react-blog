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

const makeOrderedList = () => {
  insertElement('ol');
};

const makeUnorderedList = () => {
  insertElement('ul');
};

const isField = (selection, type) => {
  let node = selection.anchorNode;

  if (node) {
    do {
      if (node.className && node.className.indexOf(type) !== -1) {
        return true;
      }
      node = node.parentNode;
    } while (node.nodeName === 'DIV' || node.nodeName === 'PRE');

  }

  return false;
};

const getLine = (text, index) => {
  const targetText = text.slice(0, index);
  let lineStart = targetText.lastIndexOf('\r');
  if (!~lineStart) {
    lineStart = targetText.lastIndexOf('\n');
  }
  if (!~lineStart) {
    lineStart = 0;
  }
  return targetText.slice(lineStart);
};

const getTabs = (selection) => {
  const text = selection.anchorNode.parentNode.innerHTML;
  let { anchorOffset, focusOffset } = selection;
  let selectionStart = anchorOffset;
  if (focusOffset < anchorOffset) {
    selectionStart = focusOffset;
  }
  const tabs = getLine(text, selectionStart).match(/\t/g);
  return tabs ? tabs.length : 0;
};

const insertElement = (type) => {
  const selection = window.getSelection();
  if (!isField(selection, 'text')) {
    NotificationManager.error('Wrong selection!');
    return;
  }
  const text = selection.toString();
  let element;
  if (type === 'ol' || type === 'ul') {
    element = `<${type}><li>${text.replace(/\r?\n|\r/g, ' ')}</li></${type}>`;
  } else {
    if (text.length === 0) {
      NotificationManager.error('Nothing is selected!');
      return;
    }

    let url;

    switch (type) {
      case 'title':
        element = `<h2>${text}</h2>`;
        break;
      case 'link':
        url = prompt('Give me a url', '');
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
  }
  document.execCommand('insertHTML', false, element);
};

const onPaste = (e) => {
  e.preventDefault();
  const data = (e.originalEvent || e).clipboardData.getData('text/plain');
  document.execCommand('insertText', false, data);
};

const handleKey = (e) => {
  if (e.keyCode === 9 || e.keyCode === 13) {
    const sel = window.getSelection();
    // handle enter
    if (e.keyCode === 13) {
      e.preventDefault();
      let newline = '\r\n';
      const anchor = sel.anchorNode;
      if (anchor.nodeType === 1) {
        newline = '\r\n\r\n';
      } else if (isField(sel, 'code')) {
        // handle indentation inside of a code field
        const tabs = getTabs(sel);
        newline = '\r\n' + Array(tabs + 1).join('\t');
      } else {
        const text = anchor.textContent;
        if (sel.isCollapsed && anchor.parentNode.nodeName === 'PRE') {
          const anchorOffset = sel.anchorOffset;
          const lastChar = text.substr(anchorOffset, 1);
          const nextChar = text.substr(anchorOffset + 1, 1);
          if (lastChar !== '\r' && lastChar !== '\n' && nextChar === '') {
            newline = '\r\n\r\n';
          }
          // handle new line inside of a shell field
          if (isField(sel, 'shell')) {
            const idx = text.indexOf('$ ');
            if (idx !== -1 && text.length === sel.anchorOffset) {
              newline = '\r\n' + getLine(text, idx + 2);
            }
          }
        }
      }
      document.execCommand('insertHTML', false, newline);
      return;
    }
    // handle tab
    if (sel.isCollapsed && !e.shiftKey)  {
      e.preventDefault();
      document.execCommand('insertHTML', false, '\t');
    }
  }
};

const PostContent = ({ label, renderFields }) => (
  <div className="form-group">
    <label>{label}</label>
    <div id="content" onPaste={onPaste} onKeyDown={handleKey}>
      {renderFields()}
    </div>
    <div id="content-controls">
      <button type="button" onClick={makeTitle}>Title</button>
      <button type="button" onClick={makeLink}>Link</button>
      <button type="button" onClick={makeBold}>Bold</button>
      <button type="button" onClick={makeCursive}>Cursive</button>
      <button type="button" onClick={makeOrderedList}>ol</button>
      <button type="button" onClick={makeUnorderedList}>ul</button>
    </div>
  </div>
);

PostContent.propTypes = {
  label: PropTypes.string,
  renderFields: PropTypes.func.isRequired
};

export default PostContent;
