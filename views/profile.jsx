const React = require('react');
const MainLayout = require('./layouts/main');

function Profile(props) {
    const {user, csrf} = props;
    return (
        <MainLayout {...props}>
            <h2>Profile</h2>
            <div className='row'>

                <div className='col s10 m6 offset-s1'>
                    {user.avatarUrl ?
                        <img className='avatar' src={`/${user.avatarUrl}`} alt={`avatar of ${user.name}`}/>
                        :
                        <p>Avatar absent</p>
                    }

                </div>

                <div className='col s10 m6 offset-s1'>
                    <form action="/profile" method='post' encType='multipart/form-data'>
                        <p>Your email: <strong>{user.email}</strong></p>

                        <div className="input-field">
                            <input id="name" name="name" type="text" className="validate" defaultValue={user.name} required/>
                            <label htmlFor="name">Name</label>
                            <span className="helper-text" data-error="Input your name"></span>
                        </div>

                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Avatar</span>
                                <input type="file" name='avatar'/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>

                        <input type='hidden' name='_csrf' defaultValue={csrf}/>

                        <button type='submit' className='btn'>Save</button>

                    </form>
                </div>
            </div>
        </MainLayout>
    );
}

module.exports = Profile;