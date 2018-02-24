import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/postActions';
import PropTypes from 'prop-types';
import PostList from '../posts/PostList';
import PostPreview from '../posts/PostPreview';
import ConfirmationModal from '../common/ConfirmationModal';

class HomePage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      postsPerPage: 9,
      page: 1,
      postsLength: 0,
      postId: ''
    };

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  componentDidMount () {
    $(document).scroll(this.loadPosts);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.postsLength !== nextProps.postsLength) {
      this.setState({ postsLength: nextProps.postsLength });
    }
  }

  componentDidUpdate () {
    const { postsPerPage, postsLength } = this.state;
    let page = this.state.page;
    if (postsLength > 0) {
      while (postsPerPage * page < postsLength) {
        if ($(document).height() === $(window).height()) {
          this.loadPosts();
          page++;
        } else {
          break;
        }
      }
    }
  }

  onDeleteClick (event) {
    this.setState({ postId: event.target.id.slice(7) });
    $('#confirmation-modal').modal('show');
  }

  confirm () {
    this.props.actions.deletePost(this.state.postId);
    $('#confirmation-modal').modal('hide');
  }

  loadPosts () {
    const { postsPerPage, page, postsLength } = this.state;
    if (postsPerPage * page < postsLength) {
      const $d = $(document);
      if ($d.height() - ($d.scrollTop() + $(window).height()) < 200) {
        this.setState({ page: this.state.page + 1 });
      }
    }
  }

  onMouseEnter (event) {
    let $el = $(event.target);
    while (!$el.hasClass('post-preview')) {
      $el = $el.parent();
    }
    $el.find('.post-controls').css('visibility', 'visible');
  }

  onMouseLeave (event) {
    $('.post-controls').css('visibility', 'hidden');
  }

  render () {
    const { page, postsPerPage } = this.state;
    const posts = this.props.posts.slice(0, page * postsPerPage);

    return [
      <PostList
        key="post-list"
        posts={posts}
        onDeleteClick={this.onDeleteClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      />,
      <ConfirmationModal key="confirmation-modal" confirm={this.confirm} />
    ];
  }
}

HomePage.propTypes = {
  posts: PropTypes.array,
  postsLength: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { posts } = state;
  const postsLength = posts.length;

  return {
    posts,
    postsLength
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
