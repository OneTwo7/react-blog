import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/postActions';
import PropTypes from 'prop-types';
import PostList from '../posts/PostList';
import PostPreview from '../posts/PostPreview';
import ConfirmationModal from '../common/ConfirmationModal';
import { showSuccessMessage, showReason } from '../../utils/notifications';

class HomePage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      postsPerPage: 9,
      page: 1,
      postsLength: props.postsLength,
      postId: ''
    };

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.confirm = this.confirm.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.reclipImages = this.reclipImages.bind(this);
  }

  componentDidMount () {
    $(document).scroll(this.loadPosts);
    $(window).resize(this.reclipImages);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.postsLength !== nextProps.postsLength) {
      this.setState({ postsLength: nextProps.postsLength });
    }
  }

  componentDidUpdate () {
    this.setPreviewHeight();
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

  componentWillUnmount () {
    $(document).off('scroll', this.loadPosts);
    $(window).off('resize', this.reclipImages);
  }

  setPreviewHeight () {
    const $postPreviews = $('.post-preview-top');
    const previewHeight = $postPreviews.eq(0).width() * 0.5625;
    $postPreviews.css('height', previewHeight);
  }

  clipImage (img) {
    const $img = $(img);
    const $postPreview = $('.post-preview-top').eq(0);
    const width = $postPreview.width();
    const height = $postPreview.height();
    let offset = 0;
    if (height > $img.height()) {
      $img.css('width', 'initial').css('height', '100%');
      offset = ($img.width() - width) / 2;
      $img.css('left', `${-offset}px`);
    }
    $img.css('clip', `rect(0px ${width + offset}px ${height}px ${offset}px)`)
    .css('visibility', 'visible');
  }

  onImageLoad (event) {
    this.clipImage(event.target);
  }

  reclipImages () {
    this.setPreviewHeight();
    const $images = $('.post-preview-top img');
    $images.css('visibility', 'hidden').css('width', '100%')
    .css('clip', 'auto').css('height', 'initial');
    $images.each(idx => {
      this.clipImage($images.eq(idx));
    });
  }

  onDeleteClick (event) {
    this.setState({ postId: event.target.id.slice(7) });
    $('#confirmation-modal').modal('show');
  }

  confirm () {
    this.props.actions.deletePost(this.state.postId).then(() => {
      showSuccessMessage('Post has been deleted.');
    }).catch(error => {
      showReason(error);
    });
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

  render () {
    const { page, postsPerPage } = this.state;
    const posts = this.props.posts.slice(0, page * postsPerPage);

    return [
      <PostList
        key="post-list"
        posts={posts}
        onDeleteClick={this.onDeleteClick}
        onLoad={this.onImageLoad}
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
