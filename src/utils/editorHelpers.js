import { showErrorMessage } from './notifications';
import strings from '../strings/utils/editorHelpers';

const fiveMegaBytes = 5 * 1024 * 1024;

const insertHTML = (html) => {
  document.execCommand('insertHTML', false, html);
};

const isField = (selection, type) => {
  let node = selection.anchorNode;

  if (!node) {
    return false;
  }

  if (node.nodeType !== 1) {
    node = node.parentNode;
  }

  return node.className.includes(type);
};

const getSelectionText = (emptyCheck) => {
  const selection = window.getSelection();
  const { lang } = document.documentElement;
  if (!isField(selection, 'text')) {
    showErrorMessage(strings[lang].wrongSelection);
    return;
  }

  const text = selection.toString();
  if (emptyCheck) {
    if (selection.isCollapsed) {
      showErrorMessage(strings[lang].nothingSelected);
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
  const text = selection.anchorNode.parentNode.innerText;
  const index = Math.min(selection.anchorOffset, selection.focusOffset);
  const tabs = getLine(text, index).match(/\t/g);
  return tabs ? tabs.length : 0;
};

export const addElement = (e) => {
  createElement(e.target.id);
};

export const createElement = (type) => {
  const { lang } = document.documentElement;
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
        url = prompt(strings[lang].inputURL, '');
        if (!url) {
          showErrorMessage(strings[lang].noURL);
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

export const sanitizeHTML = (html) => {
  return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
};

export const onPaste = (e) => {
  e.preventDefault();
  let data = sanitizeHTML(
    (e.originalEvent || e).clipboardData.getData('text/plain')
  );
  document.execCommand('insertHTML', false, data);
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

export const change = (event) => {
  const { lang } = document.documentElement;
  const input = event.target;
  const { files } = input;
  const $label = $(`label[for="${input.id}"]`);
  if (files && files[0]) {
    const { size, type } = files[0];
    if (type !== 'image/png' && type !== 'image/jpeg') {
      showErrorMessage(strings[lang].wrongFileType);
      input.value = '';
      $label.text(strings[lang].chooseFile);
      return;
    }
    if (size > fiveMegaBytes) {
      showErrorMessage(strings[lang].fileIsTooBig);
      input.value = '';
      $label.text(strings[lang].chooseFile);
      return;
    }
    $label.text(strings[lang].fileChosen);
    return files;
  } else {
    $label.text(strings[lang].chooseFile);
    return null;
  }
};

export const attachTextControls = (event) => {
  if (event.target.className === 'text') {
    const $textControls = $('#text-controls');
    $textControls.detach();
    $(event.currentTarget).find('.field-controls').prepend($textControls);
    $('#text-controls').css('display', 'flex');
  }
};

export const detachTextControls = () => {
  const $textControls = $('#text-controls');
  $textControls.css('display', 'none').detach();
  $('form').eq(0).append($textControls);
};

export const insertContent = (fields, pictures = {}) => {
  fields.forEach(({ type, id, content }) => {
    if (type !== 'img') {
      if (content) {
        $(`#${id} pre`).html(content);
      }
    } else {
      const $input = $(`#${id} .custom-file-input`);
      if ($input.length) {
        $input[0].files = pictures[id];
      }
      if (content) {
        $(`#img-${id}-sign`).val(content);
      }
    }
  });
};

export const preview = (buttonId, postPictures, savedPictures) => {
  const fieldId = buttonId.split('-').slice(1, 3).join('-');
  const $previewModal = $('#preview-modal');
  let src;
  if (savedPictures.includes(fieldId)) {
    let picture = postPictures.find(picture => picture.field === fieldId);
    src = picture.url;
  } else {
    const inputId = buttonId.split('-preview-')[0];
    const input = document.getElementById(inputId);
    if (input.files && input.files[0]) {
      src = URL.createObjectURL(input.files[0]);
    } else {
      return;
    }
  }
  $previewModal.find('.modal-body').html(`<img src="${src}">`);
  $previewModal.modal('show');
};
