import React from 'react';
import Message from "../Message/Message";
import './signin.css';

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
            lastKeyCode: event.charCode
        });
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
        this.props.onLoadingChange();
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
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    this.setState({errorMessage: user});
                }
            })
            .catch(err => console.log(err))
            .finally(() => this.props.onLoadingChange());
    };

    render() {
        const {onRouteChange, isLoading} = this.props;
        const error = this.state.errorMessage;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center relative">
                <main className="pa4 black-80">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        {
                            error ?
                                <div className="error_message">{error}</div>
                                : null
                        }
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange}
                                   className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="email" name="email-address" id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onKeyPress={this.onPasswordChange}
                                   className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="password" name="password" id="password"/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                            onClick={this.onSubmitSignin}/>
                    </div>
                    <div className="lh-copy mt3">
                        <a href="#0"
                           className="f6 link dim black db"
                           onClick={() => {
                               onRouteChange('register')
                           }}
                        >Register</a>
                    </div>
                </main>
                {isLoading
                    ? <Message/>
                    : null
                }
            </article>
        );
    }
}

export default Signin;