import React from 'react';
import './Thumbnail.css';

const secondsToHms = (secs) => {
  let h = Math.floor(secs / 3600);
  let m = Math.floor(secs % 3600 / 60);
  let s = Math.floor(secs % 3600 % 60);

  var result = "";

  if (h > 0) {
    result += "" + h + ":" + (m < 10 ? "0" : "");
  }

  result += "" + m + ":" + (s < 10 ? "0" : "");
  result += "" + s;
  return result;
}

const Thumbnail = ({videoData, openNewWindow}) => {
  return (
    <div
      className="Thumbnail"
      onClick={() => openNewWindow(videoData.url)}
    >
      <img src={videoData.thumbnail.url} alt="Video thumbnail" />
      <div className='Video-Duration'>
        {secondsToHms(parseInt(videoData.duration))}
      </div>
    </div>
  )
}

export default Thumbnail