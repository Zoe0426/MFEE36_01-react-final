import React from 'react';
import Style from './PageTag.module.css';

export default function PageTag({ title, text, pageTag, onClick }) {
  return (
    <>
      <div
        className={`${Style.tag} ${title === pageTag ? Style.active : ''}`}
        onClick={onClick}
      >
        {text}
      </div>
    </>
  );
}
