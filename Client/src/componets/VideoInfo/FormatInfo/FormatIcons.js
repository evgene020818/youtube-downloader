import React from 'react';
import './FormatIcons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeXmark, faVolumeUp, faAngleDown, faSquare } from '@fortawesome/free-solid-svg-icons';

const FormatIcons = ({ format, isHeader }) => {
  return (
    <div className="Format-Icons">
      {
        isHeader ?
          <FontAwesomeIcon className='Format-Icon Dropdown-Icon' icon={faAngleDown} /> :
          <></>
      }
      {
        !format.hasVideo ?
          <FontAwesomeIcon className='Format-Icon No-Video' icon={faVolumeUp} /> :
          !format.hasAudio ?
            <FontAwesomeIcon className='Format-Icon No-Audio' icon={faVolumeXmark} /> :
            <FontAwesomeIcon className='Format-Icon hidden' icon={faSquare} />
      }
    </div>
  )
}

export default FormatIcons