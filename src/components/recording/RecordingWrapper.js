import React from 'react';
import { Button } from 'antd';
import './RecordingWrapper.css';
import { uploadSnapshot, BASE_URL } from '../../utils';
import Authorize from '../Authorize';
import * as faceapi from 'face-api.js';

const minConfidence = 0.5;
const options = new faceapi.SsdMobilenetv1Options({ minConfidence })

export default class RecordingWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.videoPlayer = React.createRef();
    this.stagingCanvas = React.createRef();
    this.faceApiCanvas = React.createRef();
    this.intervalId = undefined;
    this.faceApiInterval = undefined;
    this.state = {
      cameraSupported: 'mediaDevices' in navigator,
      recording: false,
      canvasDimension: {},
    }
  }

  async componentDidMount() {
    await faceapi.nets.ssdMobilenetv1.loadFromUri(`${BASE_URL}/`);
    window.videoEl = this.videoPlayer.current;
    window.canvasEl = this.faceApiCanvas.current;
  }

  resizeCanvas() {
    this.setState({
      canvasDimension: {
        w: this.videoPlayer.current.scrollWidth,
        h: this.videoPlayer.current.scrollHeight,
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
      uploadSnapshot(this.stagingCanvas.current.toDataURL(), this.props.username);
    }, interval);
  }

  toggleRecording() {
    const recording = this.state.recording;
    const videoPlayer = this.videoPlayer.current;

    if(recording) {
      if(this.intervalId) {
        clearInterval(this.intervalId);
      }
      clearTimeout(this.faceApiInterval);
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

  async detectFace() {
    const videoEl = this.videoPlayer.current;
    const result = await faceapi.detectSingleFace(videoEl, options)

    if (result) {
      const canvas = this.faceApiCanvas.current;
      const dims = faceapi.matchDimensions(canvas, videoEl, true);
      if(dims && dims.width && dims.height){
        faceapi.draw.drawDetections(canvas, faceapi.resizeResults(result, dims))
      }
    }
    this.faceApiInterval = setTimeout(() => this.detectFace());
  }

  render() {
    if(!this.state.cameraSupported) {
      return <div>Your device does not support camera, or you did not give access to use camera</div>
    }

    return (
      <div className="recording-wrapper__video-section">
        <Authorize />
        <Button onClick={this.toggleRecording.bind(this)}>
          {this.state.recording ? 'Stop Video' : 'Start Video'}
        </Button>
        <div style={{ position: 'relative', margin: 'auto', width: '640px' }}>
          <video autoPlay ref={ this.videoPlayer } onLoadedMetadata={this.detectFace.bind(this)} width="640px" height="480px"></video>
          <canvas id="overlay" ref={ this.faceApiCanvas }
            style={{ position: 'absolute', top: 0, left: 0 }}
            width={ 640 }
            height={ 480 }
          />
        </div>
        <canvas ref={ this.stagingCanvas }
          className="recording-wrapper__canvas"
          width={ 640 }
          height={ 480 }
        />
      </div>
    );
  }
}
