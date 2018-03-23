import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/postActions';
import { NotificationManager } from 'react-notifications';
import TextInput from '../common/TextInput';
import PostContent from './PostContent';
import PropTypes from 'prop-types';

import FIELDS from './formFields';

class PostForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      post: Object.assign({}, props.post),
      fields: [
        { type: 'text',  id: 'field-0' }
      ],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.moveField = this.moveField.bind(this);
    this.addField = this.addField.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  componentDidMount () {
    $(document).scroll(this.fixContentControls);
    $(window).resize(this.fixContentControls);
    this.fixContentControls();
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.post.id !== nextProps.post.id) {
      this.setState({ post: Object.assign({}, nextProps.post) });
    }
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
    const $fields = $('#content').find('pre');
    for (let i = 0, length = $fields.length; i < length; i++) {
      fields[i].content = $fields.eq(i).html();
    }
    post.content = JSON.stringify(fields);
    this.setState({ post });

    if (!this.postFormIsValid()) {
      return;
    }

    this.props.actions.savePost(this.state.post).then(() => {
      this.redirect();
    }).catch(error => {
      NotificationManager.error(error);
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
          errors[name] = 'You must provide a value!';
          formIsValid = false;
        }
      }
    });

    if (!errors.title && post.title.trim().length < 4) {
      errors.title = 'Title must be at least 4 characters!';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  renderInputs () {
    return FIELDS.map(({ name, label }) => {
      if (name === 'content') {
        return (
          <PostContent
            key={name}
            label={label}
            fields={this.state.fields}
            moveField={this.moveField}
            addField={this.addField}
            clearFields={this.clearFields}
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
    const { fields } = this.state;
    const idx = this.getFieldIndex(event, fields);
    const type = this.getFieldType(event);
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
    const { fields } = this.state;
    const id = `field-${fields.length}`;
    this.setState({ fields: [...fields, { type, id }] });
  }

  clearFields () {
    this.setState({ fields: [] });
  }

  render () {
    return (
      <form>
        <h1>{this.state.post.id ? 'Edit Post' : 'New Post'}</h1>
        {this.renderInputs()}
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
      </form>
    );
  }
}

PostForm.propTypes = {
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  post: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  let post = {
    author: state.auth ? state.auth.id : null,
    title: '',
    content: '',
    category: '',
    tags: ''
  };
  const { posts } = state;
  const postId = ownProps.match.params.id;

  if (postId && posts.length > 0) {
    post = posts.filter(post => post.id === postId)[0];
  }

  return {
    post
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
