import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/postActions';
import PropTypes from 'prop-types';

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
      <div className="row">
        {
          posts.map(post => (
            <div key={post.id} className="post-wrapper col-md-4">
              <div className="post">
                <h2><Link to={`/post/${post.id}`}>{post.title}</Link></h2>
                <p>{post.content}</p>
                <div className="post-controls">
                  <Link
                    to={`/post/edit/${post.id}`}
                    className="btn btn-primary"
                  >
                    Edit
                  </Link>
                  <button
                    id={`delete-${post.id}`}
                    type="button"
                    className="btn btn-danger"
                    onClick={this.onDeleteClick}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
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
