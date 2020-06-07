import React from 'react';
import { Button } from 'antd';
import './RecordingWrapper.css';

export default class RecordingWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.videoPlayer = React.createRef();
    this.stagingCanvas = React.createRef();
    this.interval = undefined;
    this.state = {
      cameraSupported: 'mediaDevices' in navigator,
      recording: false,
    }
  }

  captureSnapshot(interval = 3000) {
    if(this.interval) {
      clearInterval(this.interval);
    }
    const context = this.stagingCanvas.current.getContext('2d');
    this.interval = setInterval(() => {
      context.drawImage(
        this.videoPlayer.current,
        0, 0, 640, 960 //TODO config the picture size
      );
    }, interval);

    //TODO do something with the picture
  }

  toggleRecording() {
    const recording = this.state.recording;
    const videoPlayer = this.videoPlayer.current;

    if(recording) {
      videoPlayer.srcObject.getVideoTracks().forEach(track => track.stop());
      videoPlayer.srcObject = undefined;
      this.setState({ recording: false });
    } else {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(videoSrc => {
          videoPlayer.srcObject = videoSrc;
          this.setState({ recording: true });
          this.captureSnapshot();
        });
    }
  }

  render() {
    if(!this.state.cameraSupported) {
      return <div>Your device does not support camera, or you did not give access to use camera</div>
    }

    return (
      <div className="recording-wrapper__video-section">
        <Button onClick={this.toggleRecording.bind(this)}>
          {this.state.recording ? 'Stop Video' : 'Start Video'}
        </Button>
        <video autoPlay ref={ this.videoPlayer } width="100%"></video>
        <canvas ref={ this.stagingCanvas } className="recording-wrapper__canvas"/>
      </div>
    );
  }
}
