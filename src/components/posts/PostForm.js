import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/postActions';
import { showErrorMessage, showReason } from '../../utils/notifications';
import TextInput from '../common/TextInput';
import PostContent from './PostContent';
import PreviewModal from '../common/PreviewModal';
import PropTypes from 'prop-types';

import FIELDS from './formFields';

class PostForm extends Component {
  constructor (props) {
    super(props);

    const { fields, savedPictures } = props;

    this.state = {
      post: Object.assign({}, props.post),
      fields: [...fields],
      pictures: {},
      cachedFields: [],
      fieldsCounter: Math.max(...fields.map(({ id }) => id.split('-')[1])) + 1,
      cachedFieldsCounter: 0,
      savedPictures: [...savedPictures],
      removedPictures: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.moveField = this.moveField.bind(this);
    this.addField = this.addField.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.cancelClear = this.cancelClear.bind(this);
    this.preview = this.preview.bind(this);
    this.reselect = this.reselect.bind(this);
  }

  componentDidMount () {
    const { fields, pictures } = this.state;
    $(document).scroll(this.fixContentControls);
    $(window).resize(this.fixContentControls);
    this.fixContentControls();
    this.insertContent(fields, pictures);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.post._id !== nextProps.post._id) {
      const { post, fields, savedPictures } = nextProps;
      const counter = Math.max(...fields.map(({ id }) => id.split('-')[1]));
      this.setState({
        post:   Object.assign({}, post),
        fields: [...fields],
        fieldsCounter: counter + 1,
        savedPictures: [...savedPictures]
      });
    }
    if (this.props.post.author !== nextProps.post.author) {
      this.setState({
        post: Object.assign({}, nextProps.post)
      });
    }
  }

  componentDidUpdate () {
    const { fields, pictures } = this.state;
    this.insertContent(fields, pictures);
    this.fixContentControls();
  }

  componentWillUnmount () {
    this.unbindFixers();
  }

  fixContentControls () {
    const $content = $('#content');
    if (!$content.length) {
      this.unbindFixers();
    }
    const $contentControls = $('#content-controls');
    const limit = $content.offset().top + $content.outerHeight(true);
    if ($(document).scrollTop() + $(window).height() - 100 < limit) {
      $contentControls.addClass('fixed');
    } else {
      $contentControls.removeClass('fixed');
    }
  }

  unbindFixers () {
    $(document).off('scroll', this.fixContentControls);
    $(window).off('resize', this.fixContentControls);
  }

  onChange (event) {
    const { name } = event.target;
    const { post } = this.state;
    post[name] = event.target.value;
    this.setState({ post });
  }

  onClick (event) {
    event.preventDefault();

    const { post, fields } = this.state;

    this.grabContent();

    post.content = JSON.stringify(fields);
    this.setState({ post });

    if (!this.postFormIsValid()) {
      return;
    }

    const { pictures, removedPictures } = this.state;

    const formData = new FormData();

    for (let key in pictures) {
      formData.append('pictures', pictures[key][0]);
      formData.append('pictureFields', key);
    }

    for (let key in post) {
      formData.append(key, post[key]);
    }

    for (let field of removedPictures) {
      formData.append('removedPictures', field);
    }

    this.props.actions.savePost(formData).then(() => {
      this.redirect();
    }).catch(error => {
      showReason(error);
    });
  }

  onCancel () {
    this.redirect();
  }

  redirect () {
    this.props.history.push('/');
  }

  postFormIsValid () {
    const { post } = this.state;
    let formIsValid = true;
    let errors = {};

    FIELDS.forEach(({ name }) => {
      if (name !== 'tags') {
        if (!post[name] || !post[name].trim()) {
          let errorMessage = `You must provide a value for ${name}`;
          errors[name] = errorMessage;
          showErrorMessage(errorMessage);
          formIsValid = false;
        }
      }
    });

    if (!errors.title && post.title.trim().length < 4) {
      let errorMessage = 'Title must be at least 4 characters!';
      errors.title = errorMessage;
      showErrorMessage(errorMessage);
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  renderInputs (savedPictures) {
    return FIELDS.map(({ name, label }) => {
      if (name === 'content') {
        return (
          <PostContent
            key={name}
            fields={this.state.fields}
            moveField={this.moveField}
            addField={this.addField}
            clear={this.clearFields}
            cancel={this.cancelClear}
            pictures={savedPictures}
            preview={this.preview}
            reselect={this.reselect}
          />
        );
      } else {
        return (
          <TextInput
            key={name}
            name={name}
            label={label}
            onChange={this.onChange}
            value={this.state.post[name]}
            error={this.state.errors[name]}
          />
        );
      }
    });
  }

  // content fields

  moveField (event) {
    const { fields, savedPictures, removedPictures } = this.state;
    const idx = this.getFieldIndex(event, fields);
    const type = this.getFieldType(event);
    const field = `field-${idx}`;
    switch (type) {
      case 'swap-up':
        fields[idx] = fields.splice(idx - 1, 1, fields[idx])[0];
        break;
      case 'swap-down':
        fields[idx] = fields.splice(idx + 1, 1, fields[idx])[0];
        break;
      case 'remove-btn':
        fields.splice(idx, 1);
        break;
      default:
        return;
    }
    if (type === 'remove-btn' && savedPictures.includes(field)) {
      this.setState({
        savedPictures: savedPictures.filter(sField => sField !== field),
        removedPictures: [...removedPictures, field],
        fields
      });
      return;
    }
    this.setState({ fields });
  }

  getFieldIndex (event, fields) {
    let target = event.target.parentNode;
    while (target.className !== 'field-wrapper') {
      target = target.parentNode;
    }
    const targetId = target.id;
    return fields.findIndex(({ id }) => targetId === id);
  }

  getFieldType (event) {
    let target = event.target;
    while (target.nodeName !== 'BUTTON') {
      target = target.parentNode;
    }
    return target.className.slice(21);
  }

  addField (event) {
    const btnType = event.target.id;
    const type = btnType.slice(0, btnType.indexOf('-'));
    const { fields, fieldsCounter } = this.state;
    const id = `field-${fieldsCounter}`;
    this.setState({
      fields: [...fields, { type, id }],
      fieldsCounter: fieldsCounter + 1
    });
  }

  clearFields () {
    const { fieldsCounter, savedPictures, removedPictures } = this.state;
    if (!fieldsCounter) {
      return;
    }
    this.grabContent();
    const { fields } = this.state;
    this.setState({
      cachedFields: fields,
      cachedFieldsCounter: fieldsCounter,
      fields: [],
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
    const { cachedFields, cachedFieldsCounter, pictures } = this.state;
    const { savedPictures, removedPictures } = this.state;
    this.setState({
      fields: cachedFields,
      fieldsCounter: cachedFieldsCounter,
      cachedFields: [],
      cachedFieldsCounter: 0,
      savedPictures: [...removedPictures],
      removedPictures: []
    });
    this.insertContent(cachedFields, pictures);
  }

  preview (event) {
    const { target } = event;
    const { pictures } = this.state.post;
    const id = target.id.split('-').slice(1, 3).join('-');
    const $previewModal = $('#preview-modal');
    let src;
    if (target.className.includes('preview-edit')) {
      let picture = pictures.find(picture => picture.field === id);
      src = picture.url;
    } else {
      const inputId = event.target.id.split('-preview-')[0];
      const input = document.getElementById(inputId);
      if (input.files && input.files[0]) {
        src = URL.createObjectURL(input.files[0]);
      } else {
        return;
      }
    }
    $previewModal.find('.modal-body').html(`<img src="${src}">`);
    $previewModal.modal('show');
  }

  reselect (event) {
    const id = event.target.id.split('-change-')[0];
    const { savedPictures, removedPictures } = this.state;
    this.setState({
      savedPictures: savedPictures.filter(field => field !== id),
      removedPictures: [...removedPictures, id]
    });
  }

  grabContent () {
    const { fields, pictures } = this.state;
    const fieldsLength = fields.length;
    for (let i = 0; i < fieldsLength; i++) {
      let field = fields[i];
      let fieldId = field.id;
      if (field.type !== 'img') {
        field.content = $(`#${field.id} pre`).eq(0).html();
      } else {
        const $pic = $(`#img-${fieldId}`).eq(0);
        const files = $pic.prop('files');
        if (files && files[0]) {
          pictures[fieldId] = files;
        }
        field.content = $(`#img-${fieldId}-sign`).val();
      }
    }
    this.setState({ fields, pictures });
  }

  insertContent (fields, pictures) {
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
  }

  render () {
    return (
      <form>
        <h1>{this.state.post._id ? 'Edit Post' : 'New Post'}</h1>
        {this.renderInputs(this.state.savedPictures)}
        <input
          type="submit"
          onClick={this.onClick}
          value="Save"
          className="btn btn-primary"
        />
        <button
          id="cancel-edit"
          type="button"
          onClick={this.onCancel}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <PreviewModal />
      </form>
    );
  }
}

PostForm.propTypes = {
  actions:       PropTypes.object.isRequired,
  history:       PropTypes.object.isRequired,
  post:          PropTypes.object.isRequired,
  fields:        PropTypes.array.isRequired,
  savedPictures: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let post = {
    author: state.auth ? state.auth._id : null,
    title: '',
    content: '',
    category: '',
    tags: '',
    pictures: []
  };
  let fields = [{ type: 'text',  id: 'field-0' }];
  let savedPictures = [];
  const { posts } = state;
  const postId = ownProps.match.params.id;

  if (postId && posts.length > 0) {
    post = posts.find(post => post._id === postId);
    fields = JSON.parse(post.content);
    savedPictures = post.pictures.map(({ field }) => field);
  }

  return {
    post,
    fields,
    savedPictures
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
