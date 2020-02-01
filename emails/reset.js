const keys = require('../keys');

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: "Your new password",
        html: `
              <h1>Are you forgot password?</h1>
              <p>If not, ignore this later</p>
              <p>Else click link</p>
              <p><a href="${keys.BASE_URL}/auth/password/${token}">Create new password</a></p>
              <hr/>
              <a href="${keys.BASE_URL}">Courses Shop</a>
             `
    }
};