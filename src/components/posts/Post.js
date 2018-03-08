import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/commentActions';
import PostList from './PostList';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ConfirmationModal from '../common/ConfirmationModal';
import { getRecommended } from '../../utils/selectors';
import { fromNow } from '../../utils/formatDate';
import { NotificationManager } from 'react-notifications';

class Post extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      comments: [],
      comment: {
        content: ''
      },
      commentId: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.confirm = this.confirm.bind(this);
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
    this.props.actions.loadComments(postId);
  }

  onChange (event) {
    const comment = this.state.comment;
    comment.content = event.target.value;
    this.setState({ comment });
  }

  onClick (event) {
    event.preventDefault();
    const comment = Object.assign({}, this.state.comment);
    const errors = {};
    let formIsValid = true;

    if (comment.content.length === 0) {
      errors.content = 'You must provide content.';
      formIsValid = false;
    }

    this.setState({ errors });

    if (!formIsValid) {
      return;
    }

    const { auth } = this.props;
    comment.post_id = this.props.post.id;
    if (!(auth && auth.id)) {
      $('#login-modal').modal('show');
    } else {
      comment.author = auth.id;
      this.props.actions.saveComment(comment).then(() => {
        NotificationManager.success('Done!');
      }).catch(error => {
        NotificationManager.error(error);
      });
      this.setDefaultComment();
    }
  }

  onEditClick (event) {
    const commentId = this.getCommentId(event.target.id);
    const comment = Object.assign(
      {}, this.props.comments.find(c => c.id === commentId)
    );
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
    this.setState({ commentId });
    $('#confirmation-modal').modal('show');
  }

  confirm () {
    this.props.actions.deleteComment(this.state.commentId).then(() => {
      NotificationManager.success('Comment has been deleted.');
    }).catch(error => {
      NotificationManager.error(error);
    });
    $('#confirmation-modal').modal('hide');
  }

  setDefaultComment () {
    this.setState({ comment: { content: '' }, errors: {} });
  }

  getCommentId (btnId) {
    return btnId.slice(btnId.indexOf('-') + 1);
  }

  render () {
    const { post, recommended, author, users } = this.props;
    const { comment, errors } = this.state;

    return (
      <div className="row">
        <section id="post" className="col-md-8 offset-md-2">
          <div className="post-top">
            <div>
              <div>{author.name}</div>
              <div>{fromNow(post.created_at)}</div>
            </div>
            <div>{post.category}</div>
          </div>
          <h1 id="post-title">{post.title}</h1>
          <p id="post-content">{post.content}</p>
          <div id="post-tags">
            {
              post.tags.length > 0 &&
              post.tags.split(' ').map((tag, idx) => (
                <div key={idx} className="tag">
                  {tag}
                </div>
              ))
            }
          </div>
          <div>{author.name}</div>
        </section>
        {
          !!recommended.length &&
          <section id="related-posts" className="col-md-10 offset-md-1">
            <div className="row">
              {
                recommended.map(p => (
                  <div key={p.post.id} className="col-md-4">
                    <div className="related-post">
                      {
                        p.type === 'tag' &&
                        <div>Also tagged {p.tag}</div>
                      }
                      <div className="bottom">
                        <h3 className="title">
                          <Link to={`/posts/${p.post.id}`}>
                            {p.post.title}
                          </Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </section>
        }
        <section id="comments" className="col-md-6 offset-md-3">
          <h2>Comments ({post.comments})</h2>
          <form id="comment-form">
            <textarea
              id="comment-content-input"
              name="content"
              value={comment.content}
              onChange={this.onChange}
              placeholder="Write a response..."
              className="form-control"
            />
            {
              errors.content &&
              <div className="alert alert-danger">
                {errors.content}
              </div>
            }
            <input
              type="submit"
              value="Submit"
              onClick={this.onClick}
              className="btn btn-primary"
            />
            {
              comment.id &&
              <button
                id="cancel-edit"
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
              <div key={c.id} className="comment">
                <div className="comment-wrapper">
                  <div className="comment-top">
                    <div>{users[c.author].name}</div>
                    <div>{fromNow(c.created_at)}</div>
                  </div>
                  <div className="comment-content">{c.content}</div>
                </div>
                <div className="comment-controls">
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
              </div>
            ))
          }
        </section>
        <ConfirmationModal confirm={this.confirm} />
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  recommended: PropTypes.array,
  users: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  auth: PropTypes.object,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let post = {
    id: '',
    author: '',
    title: '',
    content: '',
    category: '',
    tags: '',
    created_at: ''
  };
  let recommended = [];
  let author = {};
  let posts = [...state.posts];
  let postsLength = posts.length;
  const postId = ownProps.match.params.id;
  const { users, comments, auth } = state;
  let usersById = {};

  if (postId && postsLength > 0) {
    // find the post and remove it from the list
    for (let i = 0; i < postsLength; i++) {
      if (posts[i].id === postId) {
        post = posts.splice(i, 1)[0];
        postsLength--;
        break;
      }
    }
    recommended = getRecommended(post, posts, postsLength);
  }

  if (post.author && users.length > 0) {
    author = users.filter(u => u.id === post.author)[0];
  }

  for (let i = 0, l = users.length; i < l; i++) {
    usersById[users[i].id] = users[i];
  }

  return {
    post,
    recommended,
    author,
    comments,
    auth,
    users: usersById
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
