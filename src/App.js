import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm//ImageLinkForm'
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Particles from 'react-particles-js';
import  Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';

const app = new Clarifai.App({
  apiKey: 'f1156cab53ef48a9b605f3d607fb1dbd'
})

class App extends Component {
  state ={
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin'
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box})
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value})
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
        .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    this.setState({route})
  }

  render() {
    return (
      <div className="App">
      <Particles  className="particles"
              params={particleOptions}
            />
        <Navigation onRouteChange={this.onRouteChange} />
        { this.state.route === 'signin' 
          ? <SignIn onRouteChange={this.onRouteChange} /> 
          : <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
          }
      </div>
    );
  }
}


const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 100
      }
    }
  }
}

export default App;
