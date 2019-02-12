import React, {Component} from 'react';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import './App.css';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const particlesOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 500
            }
        }
    }
};

const initailState = {
    isLoading: false,
    input: '',
    imageUrl: '',
    box: [],
    route: 'signin',
    isSignedIn: false,
    rank: 0,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            input: '',
            imageUrl: '',
            box: [],
            route: 'signin',
            isSignedIn: false,
            rank: 0,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }

    // componentDidMount() {
    //     fetch('http://localhost:3005/')
    //         .then(response=> response.json())
    //         .then(console.log);
    // }

    loadUser = (user) => {
        this.setState({
            user: user.profile,
            rank: user.rank
        });
    };

    onLoadingChange = () => {
        this.setState({isLoading: !this.state.isLoading});
    };

    calculateFaceLocation = (resp) => {
        const image = document.getElementById('inputImage');
        const width = image.width;
        const height = image.height;
        let clarifaiFace = resp.regions;

        // has prediction for faces
        if (clarifaiFace && clarifaiFace.length) {
            clarifaiFace = clarifaiFace.map(region => {
                const box = region.region_info.bounding_box;
                return {
                    leftCol: box.left_col * width,
                    rightCol: width - box.right_col * width,
                    topRow: box.top_row * height,
                    bottomRow: height - box.bottom_row * height
                };
            });
        } else {
            clarifaiFace = null;
        }
        return clarifaiFace;
    };

    displayFaceRecognition = (box) => {
        this.setState({box: box});
    };

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    };

    onImageSubmit = () => {
        const {input, user} = this.state;
        if (input) {
            fetch('https://blooming-brushlands-15337.herokuapp.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: user.id,
                    url: input
                })
            })
                .then(response => response.json())
                .then(user => {
                    if (user.profile && user.rank) {
                        this.loadUser(user);
                    }
                    // Object.assign(this.state.user, {entries: entry.entries})
                    if (user.prediction)
                        this.displayFaceRecognition(this.calculateFaceLocation(user.prediction));
                })
                .catch(err => {
                    //error notification, incorrect url etc
                });
            this.setState({imageUrl: input});
        } else {
            // TODO error notification
        }
    };

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initailState);
        } else {
            if (route === 'home')
                this.setState({
                    isSignedIn: true,
                    route: route
                });
            else {
                this.setState({route: route});
            }
        }
    };

    // TODO make a form component to reduce code (Register & Sign in)
    render() {
        const {imageUrl, isSignedIn, route, box, isLoading} = this.state;
        return (
            <div className="App">
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                {
                    route === 'home'
                        ? (<div>
                            <Logo/>
                            <Rank name={this.state.user.name}
                                  entries={this.state.user.entries}
                                  rank={this.state.rank}/>
                            <ImageLinkForm
                                onInputChange={this.onInputChange}
                                onButtonSubmit={this.onImageSubmit}
                            />
                            <FaceRecognition
                                imageUrl={imageUrl}
                                faceBox={box}
                            /></div>)
                        : (
                            route === 'signin'
                                ? <Signin
                                    onRouteChange={this.onRouteChange}
                                    loadUser={this.loadUser}
                                    isLoading={isLoading}
                                    onLoadingChange={this.onLoadingChange}/>
                                : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                        )
                }
                <Particles className='particles'
                           params={particlesOptions}
                />
            </div>
        );
    }
}

export default App;
