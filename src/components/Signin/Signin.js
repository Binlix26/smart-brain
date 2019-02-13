import React from 'react';
import Message from "../Message/Message";
import './signin.css';
import Container from "../Form/Container";
import Input from "../Form/Input";
import Submit from "../Form/Submit";

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            errorMessage: '',
            lastKeyCode: null
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    };

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    onPasswordKeyPress = (event) => {
        this.setState({lastKeyCode: event.charCode})
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.lastKeyCode === 13) {
            this.setState({lastKeyCode: null}); // important to keep it out of infinite loop
            let event = document.createEvent('HTMLEvents');
            event.initEvent('click', true, false);
            document.querySelector('input[type=submit]').dispatchEvent(event);
        }
    }

    onSubmitSignin = () => {
        const {onLoadingChange, loadUser, onRouteChange} = this.props;
        onLoadingChange();
        const {email, password} = this.state;
        fetch('https://blooming-brushlands-15337.herokuapp.com/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.profile) {
                    loadUser(user);
                    onRouteChange('home');
                } else {
                    this.setState({errorMessage: user});
                }
            })
            .catch(err => console.log(err))
            .finally(() => onLoadingChange());
    };

    render() {
        const {onRouteChange, isLoading} = this.props;
        const error = this.state.errorMessage;
        return (
            <Container>
                <fieldset className='bw0'>
                    <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
                    {error ? <div className='error_message'>{error}</div> : null}
                    <Input
                        id={'email-address'}
                        name={'email'}
                        type={'email'}
                        onInputChange={this.onEmailChange}
                        onInputKeyPress={null}
                    />
                    <Input
                        id={'password'}
                        name={'password'}
                        type={'password'}
                        onInputChange={this.onPasswordChange}
                        onInputKeyPress={this.onPasswordKeyPress}
                    />
                </fieldset>
                <Submit value={'Sign In'} onSubmit={this.onSubmitSignin} />
                <div className='lh-copy mt3'>
                    <a
                        href='#'
                        className='f6 link dim black db'
                        onClick={() => {
                            onRouteChange('register');
                        }}
                    >
                        Register
                    </a>
                </div>
                {isLoading ? <Message/> : null}
            </Container>
        );
    }
}

export default Signin;