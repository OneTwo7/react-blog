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

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick (event) {
    this.props.actions.deletePost(event.target.id.slice(7));
  }

  render () {
    const { posts } = this.props;

    return (
      <PostList posts={posts} onDeleteClick={this.onDeleteClick} />
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
