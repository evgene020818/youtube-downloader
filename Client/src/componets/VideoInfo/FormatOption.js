import React from 'react';
import './FormatOption.css';
import FormatName from './FormatInfo/FormatName';
import FileSize from './FormatInfo/FileSize';
import FormatIcons from './FormatInfo/FormatIcons';
import ReactTooltip from 'react-tooltip';

const FormatOption = ({ format, handleOptionSelect }) => {
  return (
    <div
      className='Option'
      onClick={() => handleOptionSelect(format)}
      data-tip=
      {
        !format.hasVideo ? 
          'This format has no video.' :
          !format.hasAudio ? 
            'This format has no audio.' : ''
      }
    >
      <FormatName format={format} />
      <FileSize format={format} />
      <FormatIcons format={format}/>
      <ReactTooltip delayShow={300} />
    </div>
  )
}

export default FormatOption;