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
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.post.id !== nextProps.post.id) {
      this.setState({ post: Object.assign({}, nextProps.post) });
    }
  }

  onChange (event) {
    const name = event.target.name;
    const post = this.state.post;
    post[name] = event.target.value;
    this.setState({ post });
  }

  onClick (event) {
    event.preventDefault();

    const { post } = this.state;
    post.content = $('#content').html();
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
