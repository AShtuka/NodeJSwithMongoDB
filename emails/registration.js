const keys = require('../keys');

module.exports = function (email) {
  return {
      to: email,
      from: keys.EMAIL_FROM,
      subject: "You created new account on Courses Shop",
      html: `
              <h1>Welcome to my training NodeJS app: Courses-Shop</h1>
              <p>You created new account with email - ${email}</p>
              <hr/>
              <a href="${keys.BASE_URL}">Courses Shop</a>
             `
  }
};