import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/postActions';
import PropTypes from 'prop-types';
import PostList from '../posts/PostList';
import ConfirmationModal from '../common/modals/ConfirmationModal';
import { showSuccessMessage, showReason } from '../../utils/notifications';
import { setHeight, clipImage, reclipImages} from '../../utils/previewHelpers';
import strings from '../../strings/components/home/homePage';

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
  }

  componentDidMount () {
    setHeight();
    $(document).scroll(this.loadPosts);
    $(window).resize(reclipImages);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.postsLength !== nextProps.postsLength) {
      this.setState({ postsLength: nextProps.postsLength });
    }
  }

  componentDidUpdate () {
    setHeight();
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
    $(window).off('resize', reclipImages);
  }

  onImageLoad (event) {
    clipImage(event.target);
  }

  onDeleteClick (event) {
    this.setState({ postId: event.target.dataset.target });
    $('#delete-post-confirmation').modal('show');
  }

  confirm () {
    const { actions, lang } = this.props;
    actions.deletePost(this.state.postId).then(() => {
      showSuccessMessage(strings[lang].deleteMessage);
    }).catch(error => {
      showReason(error);
    });
    $('#delete-post-confirmation').modal('hide');
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
    const { posts: propsPosts, lang } = this.props;
    const posts = propsPosts.slice(0, page * postsPerPage);

    return (
      <React.Fragment>
        <PostList
          posts={posts}
          lang={lang}
          auth={this.props.auth}
          onClick={this.onDeleteClick}
          onLoad={this.onImageLoad}
        />
        <ConfirmationModal
          id="delete-post-confirmation"
          lang={lang}
          message={strings[lang].confirmation}
          confirm={this.confirm}
        />
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  auth: PropTypes.object,
  posts: PropTypes.array,
  lang: PropTypes.string.isRequired,
  postsLength: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = ({ posts, auth, lang }) => {
  const postsLength = posts.length;

  return {
    auth,
    lang,
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
