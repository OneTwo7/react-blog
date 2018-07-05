import React from 'react';
import TextInput from '../common/inputs/TextInput';
import ContentEditor from './editor/ContentEditor';
import PropTypes from 'prop-types';
import FIELDS from './formFields';

const PostInputs = (props) => {
  const { onChange, post, errors } = props;

  return FIELDS.map(({ name, label }) => {
    if (name === 'content') {
      return (
        <ContentEditor
          key={name}
          fields={props.fields}
          pictures={props.pictures}
          postPictures={post.pictures}
          updateFields={props.updateFields}
          updatePictures={props.updatePictures}
          error={errors.content}
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
          onKeyDown={name === 'tags' ? props.onTagKeyDown : null}
          error={errors[name]}
        />
      );
    }
  });
};

PostInputs.propTypes = {
  post: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  pictures: PropTypes.object.isRequired,
  updateFields: PropTypes.func.isRequired,
  updatePictures: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onTagKeyDown: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default PostInputs;
