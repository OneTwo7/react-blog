import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecommended } from '../../utils/selectors';
import Post from './Post';
import RecommendedPosts from './RecommendedPosts';
import Comments from '../comments/Comments';
import PropTypes from 'prop-types';

/* eslint-disable no-undef */

class PostPage extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const { content, pictures } = this.props.post;
    if (content) {
      this.insertContent(content, pictures);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.post._id !== nextProps.post._id) {
      this.insertContent(nextProps.post.content, nextProps.post.pictures);
    }
  }

  componentDidUpdate () {
    PR.prettyPrint();
  }

  insertContent (postContent, pictures) {
    if (!postContent) {
      return;
    }
    const fields = JSON.parse(postContent);
    let result = '';
    fields.forEach(({ type, content, id }, idx) => {
      if (type === 'text') {
        result += `<pre key="${idx}" class="text">${content}</pre>`;
      } else if (type === 'img') {
        let picture = pictures.find(picture => picture.field === id);
        result += `
          <div key="${idx}" class="card">
            <img class="card-img-top" src="${picture.url}">
            <div class="card-body">
              <p class="card-text">${content}</p>
            </div>
          </div>
        `;
      } else {
        const className = type === 'shell' ? type : 'code prettyprint';
        result += `<pre key="${idx}" class="${className}">${content}</pre>`;
      }
    });
    $('#post-content').html(result);
  }

  render () {
    const { author, post, recommended } = this.props;

    return (
      <div className="row">
        <Post author={author} post={post} />
        <RecommendedPosts recommended={recommended} />
        <Comments postId={post._id} />
      </div>
    );
  }
}

PostPage.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  recommended: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
  let post = {
    author: '',
    title: '',
    content: '',
    category: '',
    tags: '',
    created_at: ''
  };

  const postId = ownProps.match.params.id;

  const { users } = state;
  let posts = [...state.posts];
  let recommended = [];
  let author = {};

  if (postId && posts.length) {
    const postIndex = posts.findIndex(post => post._id === postId);
    post = posts.splice(postIndex, 1)[0];
    recommended = getRecommended(post, posts);
  }

  if (post.author && users.length) {
    author = users.find(user => user._id === post.author);
  }

  return {
    post,
    recommended,
    author
  };
};

export default connect(mapStateToProps)(PostPage);
