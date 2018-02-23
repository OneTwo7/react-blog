import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/postActions';
import PropTypes from 'prop-types';

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
    if (!this.postFormIsValid()) {
      return;
    }
    this.props.actions.savePost(this.state.post);
    this.redirect();
  }

  onCancel () {
    this.redirect();
  }

  redirect () {
    this.props.history.push('/');
  }

  postFormIsValid () {
    let formIsValid = true;
    let errors = {};

    if (this.state.post.title.length < 4) {
      errors.title = 'Title must be at least 4 characters.';
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  render () {
    const { post, errors } = this.state;

    return (
      <form>
        <h1>{post.id ? 'Edit Post' : 'New Post'}</h1>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={this.onChange}
            value={post.title}
            className="form-control"
          />
          {
            errors.title &&
            <div className="alert alert-danger">{errors.title}</div>
          }
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            onChange={this.onChange}
            value={post.content}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            onChange={this.onChange}
            value={post.category}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            name="tags"
            type="text"
            onChange={this.onChange}
            value={post.tags}
            className="form-control"
          />
        </div>
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
    text: '',
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

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
