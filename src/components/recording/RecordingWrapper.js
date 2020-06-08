import React from 'react';
import { Button } from 'antd';
import './RecordingWrapper.css';
import { uploadSnapshot } from '../utils';

export default class RecordingWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.videoPlayer = React.createRef();
    this.stagingCanvas = React.createRef();
    this.intervalId = undefined;
    this.state = {
      cameraSupported: 'mediaDevices' in navigator,
      recording: false,
      canvasDimension: {},
    }
  }

  resizeCanvas() {
    this.setState({
      canvasDimension: {
        w: this.videoPlayer.current.videoWidth,
        h: this.videoPlayer.current.videoHeight,
      }
    });
  }

  captureSnapshot(interval = 3000) {
    const context = this.stagingCanvas.current.getContext('2d');
    this.intervalId = setInterval(() => {
      this.resizeCanvas();
      context.drawImage(
        this.videoPlayer.current,
        0, 0, this.state.canvasDimension.w, this.state.canvasDimension.h
      );
      uploadSnapshot(this.stagingCanvas.current.toDataURL());
    }, interval);
  }

  toggleRecording() {
    const recording = this.state.recording;
    const videoPlayer = this.videoPlayer.current;

    if(recording) {
      if(this.intervalId) {
        clearInterval(this.intervalId);
      }
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
        <canvas ref={ this.stagingCanvas }
          className="recording-wrapper__canvas"
          width={ this.state.canvasDimension.w }
          height={ this.state.canvasDimension.h }
        />
      </div>
    );
  }
}
