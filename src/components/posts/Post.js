import React from 'react';
import { connect } from 'react-redux';
import PostList from './PostList';
import PropTypes from 'prop-types';

class Post extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      post: Object.assign({}, props.post)
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.post.id !== nextProps.post.id) {
      this.setState({ post: Object.assign({}, nextProps.post) });
    }
  }

  render () {
    const { post, suggested, author } = this.props;

    return (
      <article className="post">
        <span>Author: {author.name}</span>
        <h1>{this.state.post.title}</h1>
        <p id="post-content">{this.state.post.content}</p>
        <p>Category: {this.state.post.category}</p>
        <p>Tags: {this.state.post.tags}</p>
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
      </article>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  suggested: PropTypes.array
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
  const { users } = state;

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

  return {
    post,
    suggested,
    author
  };
};

export default connect(mapStateToProps)(Post);
