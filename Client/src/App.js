import { useState } from 'react';
import './App.css';
import axios from './api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import FormatsMenu from './componets/VideoInfo/FormatsMenu';
import Thumbnail from './componets/VideoInfo/Thumbnail';
import VideoTitle from './componets/VideoInfo/VideoTitle';
import ChannelInfo from './componets/VideoInfo/ChannelInfo';
import SearchBar from './componets/SearchBar';

const BACKEND_URL = '/api/';


function App() {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=MiTek_adqkc');
  const [videoData, setVideoData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let currentUrl = videoUrl;
    setErrorMessage('');
    setInfoMessage('');
    let err = null;
    setVideoData(null);
    setIsWaitingResponse(true);

    const response = await axios.post(BACKEND_URL,
      JSON.stringify({ url: videoUrl }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    ).catch((error) => {
      console.log(error)
      setIsWaitingResponse(false);
      if (error.response.data) {
        setErrorMessage(error.response.data.message);
        return;
      } else if (error.code === "ERR_NETWORK") {
        setErrorMessage("Oops! Couldn't connect to the server. Please try again later.")
        return;
      }
      setErrorMessage("Oops! Something went wrong. Please try again later.")
      err = error;
    });

    setIsWaitingResponse(false);

    if (err) {
      return;
    }

    if (response.status === 204) {
      setInfoMessage('No videos found.');
      return;
    }

    let videoDetails = response.data;
    videoDetails.url = currentUrl;

    // Searching for thumbnail with biggest resolution
    let thumbnailResolution = 0;
    let maxThumbnail;
    videoDetails.thumbnails.forEach((currThumbnail) => {
      if (currThumbnail.width * currThumbnail.height > thumbnailResolution)
        maxThumbnail = currThumbnail;
    });

    videoDetails.thumbnail = maxThumbnail;

    if (videoDetails.title.length > 50) {
      videoDetails.title = videoDetails.title.substr(0, 50) + '...';
    }

    let videoAudioGroup = [];
    let videoGroup = [];
    let audioGroup = [];
    videoDetails.formats.forEach((f) => {
      f.hasVideo && f.hasAudio ?
        videoAudioGroup.push(f) :
        f.hasVideo ?
          videoGroup.push(f) :
          audioGroup.push(f);
    })

    const comp = ( a, b ) => {
      let aRes = a.width + a.height;
      let bRes = b.width + b.height;
      if (aRes > bRes) {
        return -1;
      }
      if (aRes < bRes) {
        return 1;
      }
      return 0;
    }

    videoAudioGroup.sort(comp);
    videoGroup.sort(comp);

    videoDetails.formats = [...videoAudioGroup, ...videoGroup, ...audioGroup];

    setVideoData(videoDetails);
  }

  const openNewWindow = (url) => {
    const newWindow = window.open(url);
    newWindow.opener = null;
  }

  return (
    <div className="App">
      <h1 className='Title'>YouTube Downloader</h1>
      <span className='Description'>Download video and audio from Youtube.</span>
      <SearchBar handleSubmit={handleSubmit} setVideoUrl={setVideoUrl}/>
      {isWaitingResponse ?
        <div className="Spinner">
          <FontAwesomeIcon className='Spin-Icon' icon={faRotate} size='2x' />
        </div> : <></>
      }
      {videoData ?
        <div className="Video">
          <Thumbnail videoData={videoData} openNewWindow={openNewWindow}/>
          <div className="Video-Info">
            <VideoTitle videoData={videoData} openNewWindow={openNewWindow}/>
            <div className="View-Count">
              {videoData.viewCount.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} views
            </div>
            <ChannelInfo videoData={videoData} openNewWindow={openNewWindow}/>
            <FormatsMenu 
              formats={videoData.formats} 
              openNewWindow={openNewWindow}
            />
          </div>
        </div>
        : <></>
      }
      <div className="Error-Message">{errorMessage}</div>
      <div className="Info-Message">{infoMessage}</div>
    </div>
  );
}

export default App;
