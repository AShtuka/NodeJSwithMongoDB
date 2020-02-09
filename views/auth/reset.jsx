const React = require('react');
const MainLayout = require('../layouts/main');

function Reset(props) {
    const {csrf, resetError} = props;
    return (
        <MainLayout {...props}>
                <div className="row">

                    <div className="col s12 m8 offset-m2">

                        <h3>Forgot password</h3>

                        {resetError ? <p className='alert'>{resetError}</p> : <></>}

                        <form action="/auth/reset" method="post">
                            <div className="input-field">
                                <input id="email" name="email" type="email" className="validate" required/>
                                <label htmlFor="email">Email</label>
                                <span className="helper-text" data-error="Input email"></span>
                            </div>

                            <button className="btn btn-primary" type='submit'>Send</button>

                            <input type='hidden' name='_csrf' defaultValue={csrf}/>

                        </form>
                    </div>
                </div>
        </MainLayout>
    );
}

module.exports = Reset;