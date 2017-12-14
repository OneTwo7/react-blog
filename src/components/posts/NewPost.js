import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/postActions';
import PropTypes from 'prop-types';

class NewPost extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      post: Object.assign({}, props.post)
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
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
    this.setState({ post: post });
  }

  onClick (event) {
    event.preventDefault();
    this.props.actions.savePost(this.state.post);
    this.redirect();
  }

  redirect () {
    this.props.history.push('/');
  }

  render () {
    const { posts } = this.props;

    return (
      <form>
        <h1>New Post</h1>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={this.onChange}
            value={this.state.post.title}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            onChange={this.onChange}
            value={this.state.post.content}
            className="form-control"
          />
        </div>
        <input
          type="submit"
          onClick={this.onClick}
          value="Save"
          className="btn btn-primary"
        />
      </form>
    );
  }
}

NewPost.propTypes = {
  posts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  post: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  let post = {
    title: '',
    text: ''
  };
  const postId = ownProps.match.params.id;

  if (postId && state.posts.length > 0) {
    post = state.posts.filter(post => post.id === postId)[0];
  }

  return {
    posts: state.posts,
    post
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
