import React from 'react'
import './style.scss'
import ReactPlayer from 'react-player/youtube'
const VideoPopUp = ({show,setshow,videoId,setvideoId}) => {
    const hidePop=()=>{
        setshow(false)
        setvideoId(null);
    }
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePop}></div>
      <div className="videoPlayer">
        <span className="closeBtn" onClick={hidePop}>
          Close
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
          // playing={true}
        />
      </div>
    </div>
  );
}

export default VideoPopUp