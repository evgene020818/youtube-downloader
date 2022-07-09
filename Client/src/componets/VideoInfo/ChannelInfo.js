import React from 'react';
import './ChannelInfo.css';

const ChannelInfo = ({videoData, openNewWindow}) => {
  return (
    <div className="Channel-Info">
      <img
        className='Avatar'
        src={videoData.channelAvatar}
        alt="Channel avatar"
        onClick={() => openNewWindow(videoData.channelUrl)}
      />
      <span
        className="Channel-Name"
        onClick={() => openNewWindow(videoData.channelUrl)}
      >
        {videoData.channelName}
      </span>
    </div>
  )
}

export default ChannelInfo