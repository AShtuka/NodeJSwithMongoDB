const React = require('react');
const MainLayout = require('../layouts/main');

function NewPassword(props) {
    const {csrf, newPassError, userId, token} = props;
    return (
        <MainLayout {...props}>
            <div className="row">

                <div className="col s6 offset-s3">

                    <h1>Input new password</h1>

                    {newPassError ? <p className='alert'>{newPassError}</p> : <></>}

                    <form action="/auth/password" method="post">
                        <div className="input-field">
                            <input id="password" name="password" type="password" className="validate" required/>
                            <label htmlFor="password">Password</label>
                            <span className="helper-text" data-error="Input password"></span>
                        </div>

                        <button className="btn btn-primary" type='submit'>Save new password</button>

                        <input type='hidden' name='_csrf' defaultValue={csrf}/>
                        <input type='hidden' name='userId' defaultValue={userId}/>
                        <input type='hidden' name='token' defaultValue={token}/>

                    </form>
                </div>
            </div>
        </MainLayout>
    );
}

module.exports = NewPassword;