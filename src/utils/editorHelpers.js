import { NotificationManager } from 'react-notifications';

const insertHTML = (html) => {
  document.execCommand('insertHTML', false, html);
};

const isField = (selection, type) => {
  let node = selection.anchorNode;

  if (node.nodeType !== 1) {
    node = node.parentNode;
  }

  return node.className.indexOf(type) !== -1;
};

const getSelectionText = (emptyCheck) => {
  const selection = window.getSelection();
  if (!isField(selection, 'text')) {
    NotificationManager.error('Wrong selection!');
    return;
  }

  const text = selection.toString();
  if (emptyCheck) {
    if (selection.isCollapsed) {
      NotificationManager.error('Nothing is selected!');
      return;
    }
  }
  return text;
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
  const index = Math.min(selection.anchorOffset, selection.focusOffset);
  const tabs = getLine(text, index).match(/\t/g);
  return tabs ? tabs.length : 0;
};

export const addElement = (e) => {
  createElement(e.target.id);
};

export const createElement = (type) => {
  let element;
  let text;
  if (type === 'ol-btn' || type === 'ul-btn') {
    text = getSelectionText(false);
    if (text !== undefined) {
      const list = type.slice(0, 2);
      text = text.replace(/\r?\n|\r/g, ' ');
      element = `<${list}><li>${text}</li></${list}>`;
    }
  } else {
    text = getSelectionText(true);
    if (!text) {
      return;
    }

    let url;

    switch (type) {
      case 'title-btn':
        element = `<h2>${text}</h2>`;
        break;
      case 'bold-btn':
        element = `<strong>${text}</strong>`;
        break;
      case 'em-btn':
        element = `<em>${text}</em>`;
        break;
      case 'link-btn':
        url = prompt('Provide an address', '');
        if (!url) {
          NotificationManager.error('You need to provide a URL!');
          return;
        }
        element = `<a href="${url}">${text}</a>`;
        break;
      default:
        return;
    }
  }
  insertHTML(element);
};

export const onPaste = (e) => {
  e.preventDefault();
  const data = (e.originalEvent || e).clipboardData.getData('text/plain');
  document.execCommand('insertText', false, data);
};

export const handleKey = (e) => {
  if (e.keyCode === 9 || e.keyCode === 13) {
    const sel = window.getSelection();
    // handle enter
    if (e.keyCode === 13) {
      e.preventDefault();
      let newline = '\r\n';
      const anchor = sel.anchorNode;
      const parent = anchor.parentNode;
      if (anchor.nodeName === 'PRE') {
        newline = '\r\n\r\n';
      } else if (anchor.nodeName === 'LI' || parent.nodeName === 'LI') {
        const list = anchor.nodeName === 'LI' ? parent : parent.parentNode;
        const newItem = document.createElement('li');
        list.appendChild(newItem);
        const range = document.createRange();
        range.setStart(newItem, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return;
      } else {
        const text = anchor.textContent;
        if (sel.isCollapsed) {
          const anchorOffset = sel.anchorOffset;
          const lastChar = text.substr(anchorOffset, 1);
          const nextChar = text.substr(anchorOffset + 1, 1);
          if (lastChar !== '\r' && lastChar !== '\n' && nextChar === '') {
            newline = '\r\n\r\n';
          }
          // handle indentation inside of a code field
          if (isField(sel, 'code')) {
            const tabs = getTabs(sel);
            if (tabs) {
              newline = '\r\n' + Array(tabs + 1).join('\t');
            }
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
      insertHTML(newline);
      return;
    }
    // handle tab
    if (sel.isCollapsed && !e.shiftKey)  {
      e.preventDefault();
      insertHTML('\t');
    }
  }
};