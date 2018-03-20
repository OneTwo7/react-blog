import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/postActions';
import { NotificationManager } from 'react-notifications';
import TextInput from '../common/TextInput';
import PostContent from './PostContent';
import PropTypes from 'prop-types';

import FIELDS from './formFields';

class PostForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      post: Object.assign({}, props.post),
      fields: [
        { type: 'text',  id: 'field-0' },
        { type: 'code',  id: 'field-1' },
        { type: 'shell', id: 'field-2' }
      ],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.renderFields = this.renderFields.bind(this);
    this.fixContentControls = this.fixContentControls.bind(this);
    this.swapUp = this.swapUp.bind(this);
    this.swapDown = this.swapDown.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount () {
    $(document).scroll(this.fixContentControls);
    $(window).resize(this.fixContentControls);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.post.id !== nextProps.post.id) {
      this.setState({ post: Object.assign({}, nextProps.post) });
    }
  }

  componentWillUnmount () {
    $(document).off('scroll', this.fixContentControls);
    $(window).off('resize', this.fixContentControls);
  }

  fixContentControls () {
    const $content = $('#content');
    const $contentControls = $('#content-controls');
    const limit = $content.offset().top + $content.outerHeight(true);
    if ($(document).scrollTop() + $(window).height() - 100 < limit) {
      $contentControls.addClass('fixed');
    } else {
      $contentControls.removeClass('fixed');
    }
  }

  onChange (event) {
    const name = event.target.name;
    const post = this.state.post;
    post[name] = event.target.value;
    this.setState({ post });
  }

  onClick (event) {
    event.preventDefault();

    const { post } = this.state;
    post.content = $('#content').html();
    this.setState({ post });

    if (!this.postFormIsValid()) {
      return;
    }

    this.props.actions.savePost(this.state.post).then(() => {
      this.redirect();
    }).catch(error => {
      NotificationManager.error(error);
    });
  }

  onCancel () {
    this.redirect();
  }

  redirect () {
    this.props.history.push('/');
  }

  postFormIsValid () {
    const { post } = this.state;
    let formIsValid = true;
    let errors = {};

    FIELDS.forEach(({ name }) => {
      if (name !== 'tags') {
        if (!post[name] || !post[name].trim()) {
          errors[name] = 'You must provide a value!';
          formIsValid = false;
        }
      }
    });

    if (!errors.title && post.title.trim().length < 4) {
      errors.title = 'Title must be at least 4 characters!';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  renderInputs () {
    return FIELDS.map(({ name, label }) => {
      if (name === 'content') {
        return (
          <PostContent
            key={name}
            label={label}
            renderFields={this.renderFields}
          />
        );
      } else {
        return (
          <TextInput
            key={name}
            name={name}
            label={label}
            onChange={this.onChange}
            value={this.state.post[name]}
            error={this.state.errors[name]}
          />
        );
      }
    });
  }

  // content fields

  renderFields () {
    const { fields } = this.state;
    const props = {};
    return fields.map(({ type, id }, idx) => {
      props.className = type;
      props.spellCheck = type === 'text';
      return (
        <div key={idx} id={id} className="field-wrapper">
          <pre
            className={props.className}
            contentEditable="true"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={props.spellCheck}
          />
          <div className="field-controls">
            <button type="button" className="btn btn-outline-dark swap-up" onClick={this.swapUp}>
              <i className="fas fa-caret-up fa-lg" />
            </button>
            <button type="button" className="btn btn-outline-dark remove-btn" onClick={this.remove}>
              <i className="fas fa-times fa-lg" />
            </button>
            <button type="button" className="btn btn-outline-dark swap-down" onClick={this.swapDown}>
              <i className="fas fa-caret-down fa-lg" />
            </button>
          </div>
        </div>
      );
    });
  }

  swapUp (e) {
    const { fields } = this.state;
    const idx = this.getFieldIndex(e, fields);
    fields[idx] = fields.splice(idx - 1, 1, fields[idx])[0];
    this.setState({ fields });
  }

  swapDown (e) {
    const { fields } = this.state;
    const idx = this.getFieldIndex(e, fields);
    fields[idx] = fields.splice(idx + 1, 1, fields[idx])[0];
    this.setState({ fields });
  }

  remove (e) {
    const { fields } = this.state;
    const idx = this.getFieldIndex(e, fields);
    fields.splice(idx, 1);
    this.setState({ fields });
  }

  getFieldIndex (e, fields) {
    let target = e.target.parentNode;
    while (target.className !== 'field-wrapper') {
      target = target.parentNode;
    }
    const targetId = target.id;
    return fields.findIndex(({ id }) => targetId === id);
  }

  render () {
    return (
      <form>
        <h1>{this.state.post.id ? 'Edit Post' : 'New Post'}</h1>
        {this.renderInputs()}
        <input
          type="submit"
          onClick={this.onClick}
          value="Save"
          className="btn btn-primary"
        />
        <button
          id="cancel-edit"
          type="button"
          onClick={this.onCancel}
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </form>
    );
  }
}

PostForm.propTypes = {
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  post: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  let post = {
    author: state.auth ? state.auth.id : null,
    title: '',
    content: '',
    category: '',
    tags: ''
  };
  const { posts } = state;
  const postId = ownProps.match.params.id;

  if (postId && posts.length > 0) {
    post = posts.filter(post => post.id === postId)[0];
  }

  return {
    post
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
