import React from 'react';
import './FormatName.css';

const FormatName = ({format}) => {
  return (
      <span className='Format-Name'>
        {format.qualityLabel || format.mimeType.split('/')[1]}
      </span>
  )
}

export default FormatName