import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePost } from '../../actions/postActions';
import * as notifications from '../../utils/notifications';
import PostInputs from './PostInputs';
import PreviewModal from '../common/modals/PreviewModal';
import Tags from './Tags';
import PropTypes from 'prop-types';
import FIELDS from './formFields';

class PostForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      post: Object.assign({}, props.post),
      fields: [...props.fields],
      pictures: {},
      tags: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onTagKeyDown = this.onTagKeyDown.bind(this);
    this.onTagClick = this.onTagClick.bind(this);
    this.updateFields = this.updateFields.bind(this);
    this.updatePictures = this.updatePictures.bind(this);
  }

  componentWillMount () {
    this.prepareTags();
  }

  componentWillReceiveProps (nextProps) {
    const { post: currentPost } = this.props;
    if (currentPost._id !== nextProps.post._id) {
      const { post, fields } = nextProps;
      const tags = post.tags ? post.tags.split(' ') : [];
      post.tags = '';
      this.setState({
        post:   Object.assign({}, post),
        fields: [...fields],
        tags
      });
    }
  }

  onChange (event) {
    const { name } = event.target;
    const { post } = this.state;
    post[name] = event.target.value;
    this.setState({ post });
  }

  onClick (event) {
    event.preventDefault();

    const { post, fields, pictures, tags } = this.state;
    const savedPictures = post.pictures.map(({ field }) => field);
    const removedPictures = [...savedPictures];
    let mainPicture = '';

    const postFields = [];
    fields.forEach(field => {
      const { id, type } = field;
      if (type === 'img') {
        if (pictures[id] || savedPictures.includes(id)) {
          if (!pictures[id]) {
            if (!pictures.hasOwnProperty(id)) {
              removedPictures.splice(removedPictures.indexOf(id), 1);
            } else {
              return;
            }
          }
          if (!mainPicture) {
            mainPicture = id;
          }
          postFields.push(field);
        }
      } else {
        postFields.push(field);
      }
    });

    post.content = JSON.stringify(postFields);
    this.setState({ post });

    if (!this.isFormValid()) {
      return;
    }

    post.tags = `${post.tags} ${tags.join(' ')}`.trim();

    const formData = new FormData();

    for (let key in pictures) {
      if (pictures[key]) {
        formData.append('pictures', pictures[key][0]);
        formData.append('pictureFields', key);
      }
    }

    for (let key in post) {
      formData.append(key, post[key]);
    }

    for (let field of removedPictures) {
      formData.append('removedPictures', field);
    }

    formData.append('mainPicture', mainPicture);

    this.props.savePost(formData).then(() => {
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

  isFormValid () {
    const { post } = this.state;
    let formIsValid = true;
    let errors = {};

    FIELDS.forEach(({ name }) => {
      if (name !== 'tags') {
        if (!post[name] || !post[name].trim() || post[name] === '[]') {
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
      if (tag.trim() && !tags.includes(tag)) {
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

  updateFields (fields) {
    this.setState({ fields });
  }

  updatePictures (pictures) {
    this.setState({ pictures });
  }

  render () {
    const { post, fields, pictures, tags } = this.state;

    return (
      <form>
        <h1>{post._id ? 'Edit Post' : 'New Post'}</h1>
        <PostInputs
          post={post}
          fields={fields}
          pictures={pictures}
          updateFields={this.updateFields}
          updatePictures={this.updatePictures}
          onChange={this.onChange}
          onTagKeyDown={this.onTagKeyDown}
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
  savePost: PropTypes.func.isRequired,
  history:  PropTypes.object.isRequired,
  post:     PropTypes.object.isRequired,
  fields:   PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { auth, posts } = state;
  let post = {
    title: '',
    content: '',
    category: '',
    tags: '',
    pictures: []
  };
  let fields = [{ type: 'text',  id: 'field-0' }];
  const postId = ownProps.match.params.id;

  if (postId && posts.length > 0) {
    post = posts.find(post => post._id === postId);
    fields = JSON.parse(post.content);
  }

  return {
    post,
    fields
  };
};

export default connect(mapStateToProps, { savePost })(PostForm);
