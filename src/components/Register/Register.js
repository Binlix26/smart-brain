import React from 'react';
import Submit from "../Form/Submit";
import Container from "../Form/Container";
import Message from "../Message/Message";
import Input from "../Form/Input";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            errorMessage: '',
            lastKeyCode: null
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    };

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
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

    onSubmitRegister = (event) => {
        const {onLoadingChange, loadUser, onRouteChange} = this.props;
        const {email, password, name} = this.state;
        if (!email || !password || !name) {
            this.setState({errorMessage: 'Please enter valid registration input'});
            return;
        }
        onLoadingChange();
        fetch('https://blooming-brushlands-15337.herokuapp.com/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
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
        const {isLoading} = this.props;
        const error = this.state.errorMessage;

        return (
            <Container>
                <fieldset className='bw0'>
                    <legend className='f1 fw6 ph0 mh0'>Register</legend>
                    {error ? <div className='error_message'>{error}</div> : null}
                    <Input
                        id={'name'}
                        name={'name'}
                        type={'text'}
                        onInputChange={this.onNameChange}
                        onInputKeyPress={null}
                    />
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
                <Submit value={'Register'} onSubmit={this.onSubmitRegister}/>
                {isLoading ? <Message/> : null}
            </Container>
        );
    }
}

export default Register;