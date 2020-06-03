import React from 'react';

export default class RecordingWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.videoPlayer = React.createRef();
    this.state = {
      cameraSupported: 'mediaDevices' in navigator,
      recording: false,
    }
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
        });
    }
  }

  render() {
    if(!this.state.cameraSupported) {
      return <div>Your device does not support camera, or you did not give access to use camera</div>
    }

    return (
      <div>
        <button onClick={this.toggleRecording.bind(this)}>
          {this.state.recording ? 'Stop Video' : 'Start Video'}
        </button>
        <video controls autoPlay ref={ this.videoPlayer }></video>
      </div>
    );
  }
}
