import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/commentActions';
import PostList from './PostList';
import PropTypes from 'prop-types';

class Post extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      comments: [],
      comment: {
        content: ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentWillMount () {
    const postId = this.props.post.id;
    if (postId) {
      this.loadComments(postId);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.post.id !== nextProps.post.id) {
      this.loadComments(nextProps.post.id);
    }
    if (this.props.comments !== nextProps.comments) {
      this.setState({ comments: nextProps.comments });
    }
  }

  loadComments (postId) {
    this.props.loadComments(postId);
  }

  onChange (event) {
    const comment = this.state.comment;
    comment.content = event.target.value;
    this.setState({ comment });
  }

  onClick (event) {
    event.preventDefault();
    const comment = Object.assign({}, this.state.comment);
    if (comment.content.length === 0) {
      return;
    }
    const { auth } = this.props;
    comment.post_id = this.props.post.id;
    if (!auth) {
      $('#login-modal').modal('show');
    } else {
      comment.author = auth.id;
      this.props.saveComment(comment);
      this.setDefaultComment();
    }
  }

  onEditClick (event) {
    const commentId = this.getCommentId(event.target.id);
    const comment = this.props.comments.find(c => c.id === commentId);
    this.setState({ comment });
    $(window).scrollTop($('#comments').offset().top);
  }

  cancelEdit () {
    this.setDefaultComment();
  }

  onDeleteClick (event) {
    const commentId = this.getCommentId(event.target.id);
    if (commentId === this.state.comment.id) {
      this.setDefaultComment();
    }
    this.props.deleteComment(commentId);
  }

  setDefaultComment () {
    this.setState({ comment: { content: '' } });
  }

  getCommentId (btnId) {
    return btnId.slice(btnId.indexOf('-') + 1);
  }

  render () {
    const { post, suggested, author, users } = this.props;

    return (
      <article className="post">
        <span>Author: {author.name}</span>
        <h1>{post.title}</h1>
        <p id="post-content">{post.content}</p>
        <p>Category: {post.category}</p>
        <p>Tags: {post.tags}</p>
        {
          !!suggested.length &&
          <div className="row">
            <div className="col-12 text-center">
              <h2>Related Posts</h2>
            </div>
            {
              suggested.map(p => (
                <div key={p.post.id} className="col-md-4 text-center">
                  { p.type === 'tag' && <p>Also tagged {p.tag}</p> }
                  <h3>{p.post.title}</h3>
                </div>
              ))
            }
          </div>
        }
        <div id="comments">
          <h2>Comments ({post.comments})</h2>
          <form>
            <div className="form-group">
              <textarea
                id="content"
                name="content"
                value={this.state.comment.content}
                onChange={this.onChange}
                placeholder="Write a response..."
                className="form-control"
              />
            </div>
            <input
              type="submit"
              value="Submit"
              onClick={this.onClick}
              className="btn btn-primary"
            />
            {
              this.state.comment.id &&
              <button
                type="button"
                onClick={this.cancelEdit}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            }
          </form>
          {
            this.state.comments.map(c => (
              <div key={c.id}>
                <p>Author: {users[c.author].name}</p>
                <p>Content: {c.content}</p>
                <button
                  id={`edit-${c.id}`}
                  type="button"
                  onClick={this.onEditClick}
                  className="btn btn-link"
                >
                  edit
                </button>
                <button
                  id={`delete-${c.id}`}
                  type="button"
                  onClick={this.onDeleteClick}
                  className="btn btn-link"
                >
                  delete
                </button>
              </div>
            ))
          }
        </div>
      </article>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  suggested: PropTypes.array,
  users: PropTypes.object.isRequired,
  loadComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  auth: PropTypes.object,
  saveComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let post = {
    id: '',
    author: '',
    title: '',
    content: '',
    category: '',
    tags: ''
  };
  let suggested = [];
  let author = {};
  let posts = [...state.posts];
  let postsLength = posts.length;
  const postId = ownProps.match.params.id;
  const { users, comments, auth } = state;
  let usersById = {};

  if (postId && postsLength > 0) {
    for (let i = 0; i < postsLength; i++) {
      if (posts[i].id === postId) {
        post = posts.splice(i, 1)[0];
        postsLength--;
        break;
      }
    }
    // same category
    for (let i = 0; i < postsLength; i++) {
      if (posts[i].category === post.category) {
        suggested.push({
          type: 'category',
          post: posts.splice(i, 1)[0]
        });
        postsLength--;
        i--;
      }
    }
    // same tags
    let tags = post.tags;
    if (suggested.length < 3 && tags) {
      tags = post.tags.split(' ');
      for (let i = 0, l = tags.length; i < l; i++) {
        if (suggested.length === 3) {
          break;
        }
        for (let j = 0; j < postsLength; j++) {
          if (posts[j].tags.indexOf(tags[i]) !== -1) {
            suggested.push({
              type: 'tag',
              tag: tags[i],
              post: posts.splice(j, 1)[0]
            });
            postsLength--;
            j--;
            if (suggested.length === 3) {
              break;
            }
          }
        }
      }
    } else {
      suggested = suggested.slice(0, 3);
    }
  }

  if (post.author && users.length > 0) {
    author = users.filter(u => u.id === post.author)[0];
  }

  for (let i = 0, l = users.length; i < l; i++) {
    usersById[users[i].id] = users[i];
  }

  return {
    post,
    suggested,
    author,
    comments,
    auth,
    users: usersById
  };
};

export default connect(mapStateToProps, actions)(Post);
