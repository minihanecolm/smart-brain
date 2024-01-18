import React , {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import 'tachyons'
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignInForm from './components/SignInForm/signInForm'
import Register from './components/Register/Register'


const initialState = {
    input: '',
    imageUrl:'',
    box : [],
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
                      } }



class App extends Component {
  constructor(){
    super();
    this.state = initialState;
    
  }

  loadUser = (data) =>{
    this.setState({user: {
        id: data.id, 
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined

   } })

  }

 calculateFaceLocation = (data) => {
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  const faceBoxes = data.map(results=>{  return {
      topp: results[0]* height,
      rightt: width -(results[3]* width),
      bottonn: height - (results[2]* height),
      leftt: results[1] * width
      }})
    ;

  return faceBoxes;
}

 displayFaceBox =(box)=>{
      this.setState({box: box});
     }

  onInputChange= (event)=>{
    this.setState({input: event.target.value});

  }
 onSubmit = () => {
  this.setState({ imageUrl: this.state.input });

  fetch('https://face-app2.onrender.com/imageurl', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      imageUrl: this.state.input,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        fetch('https://face-app2.onrender.com/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.user.id,
          }),
        })
          .then((response) => response.json())
          .then((count) => {
            this.setState(Object.assign(this.state.user, { entries: count }));
          })
          .catch((error) => console.log('Error updating entries:', error));
      }
      this.displayFaceBox(this.calculateFaceLocation(data));
    })
    .catch((err) => console.log('Error fetching image URL:', err));
};



    

    onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  render(){
   const  {isSignedIn, imageUrl, route, box} = this.state;

  return (
    <div className="App">
     <ParticlesBg type="cobweb" bg={true} />
     <Navigation isSignedIn= {isSignedIn} onRouteChange={this.onRouteChange} />
      { route === 'home'
      ? <div>
          <Logo />
          <Rank 
          name={this.state.user.name}
          entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
          <FaceRecognition box = {box} imageUrl = {imageUrl} /> 
        </div>
        :(
          route === 'signin'
          ? <SignInForm loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />

          )
       
 
        }


    
      
    </div>
  );
}}

export default App;
