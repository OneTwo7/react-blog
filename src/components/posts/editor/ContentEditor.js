import React, { Component } from 'react';
import Fields from './Fields';
import EditorControls from './EditorControls';
import PreviewModal from '../../common/modals/PreviewModal';
import * as helpers from '../../../utils/editorHelpers';
import PropTypes from 'prop-types';
import strings from '../../../strings/components/posts/editor/contentEditor';

class ContentEditor extends Component {
  constructor (props) {
    super(props);

    const { fields, postPictures } = props;

    this.state = {
      savedPictures: postPictures.map(({ field }) => field),
      cachedFields: [],
      fieldsCounter: Math.max(...fields.map(({ id }) => id.split('-')[1])) + 1,
      cachedFieldsCounter: 0,
      removedPictures: []
    };

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.moveField = this.moveField.bind(this);
    this.addField = this.addField.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.cancelClear = this.cancelClear.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.reselect = this.reselect.bind(this);
  }

  componentDidMount () {
    helpers.insertContent(this.props.fields);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.fields.length !== nextProps.fields.length) {
      const { fields, pictures, postPictures } = nextProps;
      const { removedPictures } = this.state;
      let { savedPictures } = this.state;
      let fieldsCounter = 0;
      if (!savedPictures.length && !removedPictures.length) {
        savedPictures = postPictures.map(({ field }) => field);
      }
      if (fields.length) {
        fieldsCounter = Math.max(...fields.map(({ id }) => (
          id.split('-')[1]
        ))) + 1;
      }
      this.setState({ savedPictures, fieldsCounter });
    }
  }

  componentDidUpdate () {
    const { fields, pictures } = this.props;
    helpers.insertContent(fields, pictures);
  }

  onBlur (event) {
    const { target } = event;
    const fields = [...this.props.fields];
    const fieldId = this.getFieldId(target);
    fields.forEach(field => {
      if (field.id === fieldId) {
        field.content = target.innerHTML || target.value;
      }
    });
    this.props.updateFields(fields);
  }

  onChange (event) {
    const pictures = Object.assign({}, this.props.pictures);
    const fieldId = this.getFieldId(event.target);
    const files = helpers.change(event);
    pictures[fieldId] = files;
    this.props.updatePictures(pictures);
  }

  moveField (event) {
    const fields = [...this.props.fields];
    const { savedPictures, removedPictures } = this.state;
    const { target } = event;
    const fieldId = this.getFieldId(target);
    const type = this.getButtonType(target);
    const idx = fields.findIndex(({ id }) => id === fieldId);
    const { type: fieldType } = fields[idx];
    if (type === 'swap-up') {
      fields[idx] = fields.splice(idx - 1, 1, fields[idx])[0];
    } else if (type === 'swap-down') {
      fields[idx] = fields.splice(idx + 1, 1, fields[idx])[0];
    } else {
      fields.splice(idx, 1);
      if (fieldType === 'text') {
        helpers.detachTextControls();
      }
      if (savedPictures.includes(fieldId)) {
        savedPictures.splice(savedPictures.indexOf(fieldId), 1);
        removedPictures.push(fieldId);
      }
    }
    this.props.updateFields(fields);
    this.setState({ savedPictures, removedPictures });
  }

  getFieldId (element) {
    let node = element.parentNode;
    while (node.className !== 'field-wrapper') {
      node = node.parentNode;
    }
    return node.id;
  }

  getButtonType (element) {
    let target = element;
    while (target.nodeName !== 'BUTTON') {
      target = target.parentNode;
    }
    return target.className.split(' ')[2];
  }

  addField (event) {
    const { fieldsCounter } = this.state;
    const btnType = event.target.id;
    const type = btnType.split('-')[0];
    const id = `field-${fieldsCounter}`;
    this.props.updateFields([...this.props.fields, { type, id }]);
    this.setState({ fieldsCounter: fieldsCounter + 1 });
  }

  clearFields () {
    const { fieldsCounter, savedPictures, removedPictures } = this.state;
    if (!fieldsCounter) {
      return;
    }
    const fields = [...this.props.fields];
    helpers.detachTextControls();
    this.props.updateFields([]);
    this.setState({
      cachedFields: fields,
      cachedFieldsCounter: fieldsCounter,
      fieldsCounter: 0,
      savedPictures: [],
      removedPictures: [...savedPictures]
    });
  }

  cancelClear () {
    const { fieldsCounter } = this.state;
    if (fieldsCounter) {
      return;
    }
    const { pictures } = this.props;
    const { cachedFields, cachedFieldsCounter } = this.state;
    const { savedPictures, removedPictures } = this.state;
    this.props.updateFields(cachedFields);
    this.setState({
      fieldsCounter: cachedFieldsCounter,
      cachedFields: [],
      cachedFieldsCounter: 0,
      savedPictures: [...removedPictures],
      removedPictures: []
    });
  }

  onPreview (event) {
    helpers.preview(
      event.target.id, this.props.postPictures, this.state.savedPictures
    );
  }

  reselect (event) {
    const id = event.target.id.split('-change-')[0];
    const pictures = Object.assign({}, this.props.pictures);
    pictures[id] = null;
    const { savedPictures, removedPictures } = this.state;
    this.setState({
      savedPictures: savedPictures.filter(field => field !== id),
      removedPictures: [...removedPictures, id]
    });
    this.props.updatePictures(pictures);
  }

  render () {
    const { lang, fields, error } = this.props;

    return (
      <React.Fragment>
        <div className="form-group">
          <label>{strings[lang].content}</label>
          <Fields
            fields={fields}
            lang={lang}
            move={this.moveField}
            pictures={this.state.savedPictures}
            preview={this.onPreview}
            reselect={this.reselect}
            blur={this.onBlur}
            change={this.onChange}
          />
          <EditorControls lang={lang} id="text-controls" />
          <EditorControls
            lang={lang}
            id="content-controls"
            addField={this.addField}
            clearFields={this.clearFields}
            cancelClear={this.cancelClear}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <PreviewModal />
      </React.Fragment>
    );
  }
}

ContentEditor.propTypes = {
  lang:           PropTypes.string.isRequired,
  fields:         PropTypes.array.isRequired,
  pictures:       PropTypes.object.isRequired,
  postPictures:   PropTypes.array.isRequired,
  updateFields:   PropTypes.func.isRequired,
  updatePictures: PropTypes.func.isRequired,
  error:          PropTypes.string
};

export default ContentEditor;
