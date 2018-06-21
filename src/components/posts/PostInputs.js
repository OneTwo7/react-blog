import React from 'react';
import TextInput from '../common/TextInput';
import PostContent from './PostContent';
import PropTypes from 'prop-types';

import FIELDS from './formFields';

const PostInputs = (props) => {
  const { onChange, post, errors } = props;

  return FIELDS.map(({ name, label }) => {
    if (name === 'content') {
      return (
        <PostContent
          key={name}
          fields={props.fields}
          moveField={props.move}
          addField={props.add}
          clear={props.clear}
          cancel={props.cancel}
          pictures={props.pictures}
          preview={props.preview}
          reselect={props.reselect}
        />
      );
    } else {
      return (
        <TextInput
          key={name}
          name={name}
          label={label}
          onChange={onChange}
          value={post[name]}
          error={errors[name]}
        />
      );
    }
  });
};

PostInputs.propTypes = {
  fields: PropTypes.array.isRequired,
  move: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  pictures: PropTypes.array.isRequired,
  preview: PropTypes.func.isRequired,
  reselect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default PostInputs;
