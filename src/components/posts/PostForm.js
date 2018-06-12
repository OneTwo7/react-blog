import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/postActions';
import { showErrorMessage, showReason } from '../../utils/notifications';
import TextInput from '../common/TextInput';
import PostContent from './PostContent';
import PropTypes from 'prop-types';

import FIELDS from './formFields';

class PostForm extends React.Component {
  constructor (props) {
    super(props);

    const { fields } = props;

    this.state = {
      post: Object.assign({}, props.post),
      fields: [...fields],
      cachedFields: [],
      fieldsCounter: fields.length,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.moveField = this.moveField.bind(this);
    this.addField = this.addField.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.cancelClear = this.cancelClear.bind(this);
  }

  componentDidMount () {
    $(document).scroll(this.fixContentControls);
    $(window).resize(this.fixContentControls);
    this.fixContentControls();
    this.insertContent(this.state.fields);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.post._id !== nextProps.post._id) {
      this.setState({
        post:   Object.assign({}, nextProps.post),
        fields: nextProps.fields
      });
    }
  }

  componentDidUpdate () {
    this.insertContent(this.state.fields);
    this.fixContentControls();
  }

  componentWillUnmount () {
    this.unbindFixers();
  }

  fixContentControls () {
    const $content = $('#content');
    if (!$content.length) {
      this.unbindFixers();
    }
    const $contentControls = $('#content-controls');
    const limit = $content.offset().top + $content.outerHeight(true);
    if ($(document).scrollTop() + $(window).height() - 100 < limit) {
      $contentControls.addClass('fixed');
    } else {
      $contentControls.removeClass('fixed');
    }
  }

  unbindFixers () {
    $(document).off('scroll', this.fixContentControls);
    $(window).off('resize', this.fixContentControls);
  }

  onChange (event) {
    const { name } = event.target;
    const { post } = this.state;
    post[name] = event.target.value;
    this.setState({ post });
  }

  onClick (event) {
    event.preventDefault();

    const { post, fields } = this.state;

    this.grabContent();

    post.content = JSON.stringify(fields);
    this.setState({ post });

    if (!this.postFormIsValid()) {
      return;
    }

    this.props.actions.savePost(this.state.post).then(() => {
      this.redirect();
    }).catch(error => {
      showReason(error);
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
          let errorMessage = `You must provide a value for ${name}`;
          errors[name] = errorMessage;
          showErrorMessage(errorMessage);
          formIsValid = false;
        }
      }
    });

    if (!errors.title && post.title.trim().length < 4) {
      let errorMessage = 'Title must be at least 4 characters!';
      errors.title = errorMessage;
      showErrorMessage(errorMessage);
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
            fields={this.state.fields}
            moveField={this.moveField}
            addField={this.addField}
            clear={this.clearFields}
            cancel={this.cancelClear}
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

  moveField (event) {
    const { fields } = this.state;
    const idx = this.getFieldIndex(event, fields);
    const type = this.getFieldType(event);
    switch (type) {
      case 'swap-up':
        fields[idx] = fields.splice(idx - 1, 1, fields[idx])[0];
        break;
      case 'swap-down':
        fields[idx] = fields.splice(idx + 1, 1, fields[idx])[0];
        break;
      case 'remove-btn':
        fields.splice(idx, 1);
        break;
      default:
        return;
    }
    this.setState({ fields });
  }

  getFieldIndex (event, fields) {
    let target = event.target.parentNode;
    while (target.className !== 'field-wrapper') {
      target = target.parentNode;
    }
    const targetId = target.id;
    return fields.findIndex(({ id }) => targetId === id);
  }

  getFieldType (event) {
    let target = event.target;
    while (target.nodeName !== 'BUTTON') {
      target = target.parentNode;
    }
    return target.className.slice(21);
  }

  addField (event) {
    const btnType = event.target.id;
    const type = btnType.slice(0, btnType.indexOf('-'));
    const { fields, fieldsCounter } = this.state;
    const id = `field-${fieldsCounter}`;
    this.setState({
      fields: [...fields, { type, id }],
      fieldsCounter: fieldsCounter + 1
    });
  }

  clearFields () {
    const { fieldsCounter } = this.state;
    if (!fieldsCounter) {
      return;
    }
    this.grabContent();
    const { fields: cachedFields } = this.state;
    this.setState({ cachedFields, fields: [], fieldsCounter: 0 });
  }

  cancelClear () {
    const { fieldsCounter } = this.state;
    if (fieldsCounter) {
      return;
    }
    const { cachedFields: fields } = this.state;
    this.setState({ fields, fieldsCounter: fields.length, cachedFields: [] });
    this.insertContent(fields);
  }

  grabContent () {
    const { fields } = this.state;
    const $fields = $('#content').find('pre');
    const fieldsCounter = fields.length;
    for (let i = 0; i < fieldsCounter; i++) {
      fields[i].content = $fields.eq(i).html();
      fields[i].id = `field-${i}`;
    }
    this.setState({ fields, fieldsCounter });
  }

  insertContent (fields) {
    fields.forEach(({ id, content }) => {
      if (content) {
        $(`#${id} pre`).html(content);
      }
    });
  }

  render () {
    return (
      <form>
        <h1>{this.state.post._id ? 'Edit Post' : 'New Post'}</h1>
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
  post:    PropTypes.object.isRequired,
  fields:  PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let post = {
    author: state.auth ? state.auth._id : null,
    title: '',
    content: '',
    category: '',
    tags: ''
  };
  let fields = [{ type: 'text',  id: 'field-0' }];
  const { posts } = state;
  const postId = ownProps.match.params.id;

  if (postId && posts.length > 0) {
    post = posts.find(post => post._id === postId);
    fields = JSON.parse(post.content);
  }

  return {
    post,
    fields
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
