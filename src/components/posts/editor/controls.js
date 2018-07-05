export const textControls = [
  { type: 'addElement',  id: 'title-btn', text: 'Title' },
  { type: 'addElement',  id: 'link-btn',  text: 'Link' },
  { type: 'addElement',  id: 'bold-btn',  text: 'A' },
  { type: 'addElement',  id: 'em-btn',    text: 'A' },
  { type: 'addElement',  id: 'ol-btn',    text: 'ol' },
  { type: 'addElement',  id: 'ul-btn',    text: 'ul' },
];

export const contentControls = [
  { type: 'addField',    id: 'text-btn',         text: 'Text' },
  { type: 'addField',    id: 'code-btn',         text: 'Code' },
  { type: 'addField',    id: 'shell-btn',        text: 'Shell' },
  { type: 'addField',    id: 'img-btn',          text: 'Picture' },
  { type: 'clearFields', id: 'clear-btn',        text: 'Clear' },
  { type: 'cancelClear', id: 'cancel-clear-btn', text: 'Cancel' }
];

export const btnClass = {
  addElement:  'btn btn-light',
  addField:    'btn btn-outline-dark',
  clearFields: 'btn btn-outline-danger',
  cancelClear: 'btn btn-outline-secondary'
};
