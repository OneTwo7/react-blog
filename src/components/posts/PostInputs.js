import React from 'react';
import TextInput from '../common/inputs/TextInput';
import ContentEditor from './editor/ContentEditor';
import PropTypes from 'prop-types';
import FIELDS from './formFields';
import strings from '../../strings/components/posts/postInputs';

const PostInputs = (props) => {
  const { onChange, post, lang, errors } = props;

  return FIELDS.map(field => {
    if (field === 'content') {
      return (
        <ContentEditor
          key={field}
          lang={lang}
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
          key={field}
          name={field}
          label={strings[lang][field]}
          onChange={onChange}
          value={post[field]}
          onKeyDown={field === 'tags' ? props.onTagKeyDown : null}
          error={errors[field]}
        />
      );
    }
  });
};

PostInputs.propTypes = {
  lang: PropTypes.string.isRequired,
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
