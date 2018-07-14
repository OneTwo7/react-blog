export const textControls = [
  { type: 'addElement',  id: 'title-btn' },
  { type: 'addElement',  id: 'link-btn' },
  { type: 'addElement',  id: 'bold-btn' },
  { type: 'addElement',  id: 'em-btn' },
  { type: 'addElement',  id: 'ol-btn' },
  { type: 'addElement',  id: 'ul-btn' },
];

export const contentControls = [
  { type: 'addField',    id: 'text-btn' },
  { type: 'addField',    id: 'code-btn' },
  { type: 'addField',    id: 'shell-btn' },
  { type: 'addField',    id: 'img-btn' },
  { type: 'clearFields', id: 'clear-btn' },
  { type: 'cancelClear', id: 'cancel-clear-btn' }
];

export const btnClass = {
  addElement:  'btn btn-light',
  addField:    'btn btn-outline-dark',
  clearFields: 'btn btn-outline-danger',
  cancelClear: 'btn btn-outline-secondary'
};
