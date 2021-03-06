const React = require('react');
const MainLayout = require('../layouts/main');

function Login(props) {
    const {csrf, loginError, regError} = props;
    return (
        <MainLayout {...props}>
            <div className='auth'>
                <div className="row">
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s6"><a className="active" href="#login">Log In</a></li>
                            <li className="tab col s6"><a  href="#registration">Registration</a></li>
                        </ul>
                    </div>
                    <div id="login" className="col s12 m8 offset-m2">

                        <h3>Log in shop</h3>

                        {loginError ? <p className='alert'>{loginError}</p> : <></>}

                        <form action="/auth/login" method="post">
                            <div className="input-field">
                                <input id="email" name="email" type="email" className="validate" required/>
                                <label htmlFor="email">Email</label>
                                <span className="helper-text" data-error="Input email"></span>
                            </div>

                            <div className="input-field">
                                <input id="password" name="password" type="password" className="validate" required/>
                                <label htmlFor="password">Password</label>
                                <span className="helper-text" data-error="Input password"></span>
                            </div>

                            <div className='login-btn-container'>
                                <button className="btn btn-primary" type='submit'>Log In</button>
                                <a href="/auth/reset">
                                    <button className="btn btn-primary" type='button'>Forgot password ?</button>
                                </a>
                            </div>

                            <input type='hidden' name='_csrf' defaultValue={csrf}/>

                        </form>
                    </div>
                    <div id="registration" className="col s12 m8 offset-m2">

                        <h3>Create account</h3>

                        {regError ? <p className='alert'>{regError}</p> : <></>}

                        <form action="/auth/registration" method="post">

                            <div className="input-field">
                                <input id="name" name="name" type="text" className="validate" required/>
                                <label htmlFor="name">Name</label>
                                <span className="helper-text" data-error="Input your name"></span>
                            </div>

                            <div className="input-field">
                                <input id="emailReg" name="email" type="email" className="validate" required/>
                                <label htmlFor="emailReg">Email</label>
                                <span className="helper-text" data-error="Input email"></span>
                            </div>

                            <div className="input-field">
                                <input id="passwordReg" name="password" type="password" className="validate" required/>
                                <label htmlFor="passwordReg">Password</label>
                                <span className="helper-text" data-error="Input password"></span>
                            </div>

                            <div className="input-field">
                                <input id="passwordConfirm" name="passwordConfirm" type="password" className="validate" required/>
                                <label htmlFor="passwordConfirm">Password again</label>
                                <span className="helper-text" data-error="Input password"></span>
                            </div>

                            <button className="btn btn-primary" type='submit'>Registration</button>

                            <input type='hidden' name='_csrf' defaultValue={csrf}/>

                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

module.exports = Login;