import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/commentActions';
import CommentForm from '../comments/CommentForm';
import CommentsList from './CommentsList';
import ConfirmationModal from '../common/ConfirmationModal';
import { showSuccessMessage, showReason } from '../../utils/notifications';
import PropTypes from 'prop-types';

class Comments extends Component {
  constructor (props) {
    super(props);

    this.state = {
      comments: [],
      comment: { content: '' },
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
    const { postId } = this.props;
    if (postId) {
      this.loadComments(postId);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.postId !== nextProps.postId) {
      this.loadComments(nextProps.postId);
    }
    if (this.props.comments !== nextProps.comments) {
      this.setState({ comments: nextProps.comments });
    }
  }

  loadComments (postId) {
    this.props.actions.loadComments(postId);
  }

  commentFormIsValid () {
    let formIsValid = true;
    const errors = {};

    if (this.state.comment.content.trim().length === 0) {
      errors.content = 'You must provide content.';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  setDefaultComment () {
    this.setState({ comment: { content: '' }, errors: {} });
  }

  getCommentId (btnId) {
    return btnId.split('-')[1];
  }

  onChange (event) {
    const comment = this.state.comment;
    comment.content = event.target.value;
    this.setState({ comment });
  }

  onClick (event) {
    event.preventDefault();

    if (!this.commentFormIsValid()) {
      return;
    }

    const comment = Object.assign({}, this.state.comment);
    const { auth } = this.props;
    comment.post_id = this.props.postId;

    if (!(auth && auth._id)) {
      $('#login-modal').modal('show');
    } else {
      if (!comment.author) {
        comment.author = auth._id;
      }
      this.props.actions.saveComment(comment).then(() => {
        showSuccessMessage('Done!');
      }).catch(error => {
        showReason(error);
      });
      this.setDefaultComment();
    }
  }

  onEditClick (event) {
    const commentId = this.getCommentId(event.target.id);
    const comment = Object.assign(
      {}, this.props.comments.find(c => c._id === commentId)
    );
    this.setState({ comment });
    $(window).scrollTop($('#comments').offset().top);
  }

  cancelEdit () {
    this.setDefaultComment();
  }

  onDeleteClick (event) {
    const commentId = this.getCommentId(event.target.id);
    if (commentId === this.state.comment._id) {
      this.setDefaultComment();
    }
    this.setState({ commentId });
    $('#confirmation-modal').modal('show');
  }

  confirm () {
    this.props.actions.deleteComment(this.state.commentId, this.props.postId)
    .then(() => {
      showSuccessMessage('Comment has been deleted.');
    }).catch(error => {
      showReason(error);
    });
    $('#confirmation-modal').modal('hide');
  }

  render () {
    const { auth, comments, usersById, count } = this.props;

    return (
      <section id="comments" className="col-md-6 offset-md-3">
        <h2>Comments ({count})</h2>
        <CommentForm
          comment={this.state.comment}
          errors={this.state.errors}
          onChange={this.onChange}
          onClick={this.onClick}
          cancelEdit={this.cancelEdit}
        />
        <CommentsList
          auth={auth}
          comments={comments}
          users={usersById}
          onEdit={this.onEditClick}
          onDelete={this.onDeleteClick}
        />
        <ConfirmationModal confirm={this.confirm} />
      </section>
    );
  }
}

Comments.propTypes = {
  count: PropTypes.number,
  postId: PropTypes.string,
  auth: PropTypes.object,
  comments: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  usersById: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { comments, auth, users } = state;
  const count = comments.length;
  const usersById = {};

  for (let i = 0, l = users.length; i < l; i++) {
    usersById[users[i]._id] = users[i].name;
  }

  return {
    auth,
    comments,
    usersById,
    count
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
