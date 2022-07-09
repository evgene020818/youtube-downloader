import React from 'react';
import './VideoTitle.css';

const VideoTitle = ({videoData, openNewWindow}) => {
  return (
    <div
      className='Video-Title'
      onClick={() => openNewWindow(videoData.url)}
    >
      {videoData.title}
    </div>
  )
}

export default VideoTitle