import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/postActions';
import PropTypes from 'prop-types';
import PostList from '../posts/PostList';
import PostPreview from '../posts/PostPreview';

class HomePage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      postsPerPage: 9,
      page: 1
    };

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.loadMorePosts = this.loadMorePosts.bind(this);
  }

  onDeleteClick (event) {
    this.props.actions.deletePost(event.target.id.slice(7));
  }

  loadMorePosts () {
    this.setState({ page: this.state.page + 1 });
  }

  render () {
    const { posts } = this.props;
    const vPosts = posts.slice(0, this.state.page * this.state.postsPerPage);
    const showButton = vPosts.length < posts.length;

    return (
      <PostList
        posts={vPosts}
        onDeleteClick={this.onDeleteClick}
        showButton={showButton}
        loadMorePosts={this.loadMorePosts}
      />
    );
  }
}

HomePage.propTypes = {
  posts: PropTypes.array,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
