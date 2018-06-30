import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/postActions';
import * as notifications from '../../utils/notifications';
import { detachTextControls } from '../../utils/editorHelpers';
import PostInputs from './PostInputs';
import PreviewModal from '../common/PreviewModal';
import Tags from '../common/Tags';
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
      mainPicture: {
        field: savedPictures[0] ? savedPictures[0] : ''
      },
      tags: [],
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
    this.onTagKeyDown = this.onTagKeyDown.bind(this);
    this.onTagClick = this.onTagClick.bind(this);
  }

  componentWillMount () {
    this.prepareTags();
  }

  componentDidMount () {
    const { fields, pictures } = this.state;
    this.insertContent(fields, pictures);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.post._id !== nextProps.post._id) {
      const { post, fields, savedPictures } = nextProps;
      const counter = Math.max(...fields.map(({ id }) => id.split('-')[1]));
      const tags = post.tags ? post.tags.split(' ') : [];
      post.tags = '';
      this.setState({
        post:   Object.assign({}, post),
        fields: [...fields],
        fieldsCounter: counter + 1,
        savedPictures: [...savedPictures],
        mainPicture: { field: savedPictures[0] },
        tags
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

    const { pictures, savedPictures } = this.state;

    const postFields = [];
    fields.forEach(field => {
      const { id, type } = field;
      if (type === 'img') {
        if (pictures[id] || savedPictures.includes(id)) {
          postFields.push(field);
        }
      } else {
        postFields.push(field);
      }
    });

    post.content = JSON.stringify(postFields);
    this.setState({ post });

    if (!this.postFormIsValid()) {
      return;
    }

    const { removedPictures, mainPicture, tags } = this.state;

    if (post.tags) {
      post.tags = `${tags.join(' ')} ${post.tags}`.trim();
    } else {
      post.tags = tags.join(' ').trim();
    }

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

    formData.append('mainPicture', mainPicture.field);

    this.props.actions.savePost(formData).then(() => {
      this.redirect();
      notifications.showSuccessMessage('Post saved!');
    }).catch(error => {
      notifications.showReason(error);
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
          notifications.showErrorMessage(errorMessage);
          formIsValid = false;
        }
      }
    });

    if (!errors.title && post.title.trim().length < 4) {
      let errorMessage = 'Title must be at least 4 characters!';
      errors.title = errorMessage;
      notifications.showErrorMessage(errorMessage);
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  onTagKeyDown (event) {
    const { keyCode, key } = event;
    if (keyCode === 13 || keyCode === 32 || key === ',') {
      event.preventDefault();
      const { post, tags } = this.state;
      const tag = post.tags;
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
      post.tags = '';
      this.setState({ post, tags });
    }
  }

  onTagClick (event) {
    const { post, tags } = this.state;
    const idx = event.target.id.split('-')[1];
    const tag = tags[idx];
    tags.splice(idx, 1);
    post.tags = tag;
    this.setState({ post, tags });
    $('#tags').focus();
  }

  prepareTags () {
    const { post } = this.state;
    if (post._id && post.tags) {
      const tags = post.tags.split(' ');
      post.tags = '';
      this.setState({ post, tags });
    }
  }

  // content fields

  moveField (event) {
    const { fields, savedPictures, removedPictures } = this.state;
    const fieldId = this.getFieldId(event);
    const idx = fields.findIndex(({ id }) => id === fieldId);
    const type = this.getButtonType(event);
    const { type: fieldType } = fields[idx];
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
    if (type === 'remove-btn') {
      if (fieldType === 'text') {
        detachTextControls();
      }
      if (savedPictures.includes(fieldId)) {
        this.setState({
          savedPictures: savedPictures.filter(sField => sField !== fieldId),
          removedPictures: [...removedPictures, fieldId],
          fields
        });
        return;
      }
    }
    this.setState({ fields });
  }

  getFieldId (event) {
    let node = event.target.parentNode;
    while (node.className !== 'field-wrapper') {
      node = node.parentNode;
    }
    return node.id;
  }

  getButtonType (event) {
    let target = event.target;
    while (target.nodeName !== 'BUTTON') {
      target = target.parentNode;
    }
    return target.className.split(' ')[2];
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
    const { post, savedPictures } = this.state;
    const id = target.id.split('-').slice(1, 3).join('-');
    const $previewModal = $('#preview-modal');
    let src;
    if (savedPictures.includes(id)) {
      let picture = post.pictures.find(picture => picture.field === id);
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
    const { fields, pictures, mainPicture } = this.state;
    const fieldsLength = fields.length;
    for (let i = 0; i < fieldsLength; i++) {
      let field = fields[i];
      let fieldId = field.id;
      if (field.type !== 'img') {
        field.content = $(`#${fieldId} pre`).eq(0).html();
      } else {
        const $pic = $(`#img-${fieldId}`).eq(0);
        const files = $pic.prop('files');
        if (files && files[0]) {
          if (!mainPicture.field) {
            mainPicture.field = fieldId;
          }
          pictures[fieldId] = files;
        }
        field.content = $(`#img-${fieldId}-sign`).val();
      }
    }
    this.setState({ fields, pictures, mainPicture });
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
    const { post, tags } = this.state;

    return (
      <form>
        <h1>{post._id ? 'Edit Post' : 'New Post'}</h1>
        <PostInputs
          fields={this.state.fields}
          move={this.moveField}
          add={this.addField}
          clear={this.clearFields}
          cancel={this.cancelClear}
          pictures={this.state.savedPictures}
          preview={this.preview}
          reselect={this.reselect}
          onChange={this.onChange}
          onTagKeyDown={this.onTagKeyDown}
          post={post}
          errors={this.state.errors}
        />
        <Tags
          tags={tags}
          onClick={this.onTagClick}
        />
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
  const { auth, posts } = state;
  let post = {
    author: auth ? auth._id : null,
    title: '',
    content: '',
    category: '',
    tags: '',
    pictures: []
  };
  let fields = [{ type: 'text',  id: 'field-0' }];
  let savedPictures = [];
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
