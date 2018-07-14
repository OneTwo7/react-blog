import React from 'react';
import PropTypes from 'prop-types';

const LanguageSelector = ({ lang, select }) => {
  const setLang = lang === 'ru' ? 'en' : 'ru';

  return (
    <div className="dropdown" id="language-selector">
      <button
        className="btn dropdown-toggle"
        type="button"
        id={`${lang}-btn`}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {lang === 'ru' ? 'Русский' : 'English'}
      </button>
      <div className="dropdown-menu" aria-labelledby={`${lang}Btn`}>
        <button
          onClick={select}
          className="dropdown-item btn"
          id={`${setLang}-btn`}
          data-lang={setLang}
        >
          {lang === 'ru' ? 'English' : 'Русский'}
        </button>
      </div>
    </div>
  );
};

LanguageSelector.propTypes = {
  lang: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired
};

export default LanguageSelector;
