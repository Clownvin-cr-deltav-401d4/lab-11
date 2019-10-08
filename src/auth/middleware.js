'use strict';

const User = require('./users-model.js');

/**
 * Authenticates a request via various means.
 * @param {*} req the request that needs authenticated
 * @param {*} res the response
 * @param {*} next function to call the next middleware
 */
const authenticate = (req, res, next) => {

  try {

    let [authType, encodedString] = req.headers.authorization.split(/\s+/);

    // BASIC Auth  ... Authorization:Basic ZnJlZDpzYW1wbGU=

    switch(authType.toLowerCase()) {
    case 'basic':
      console.log('Basic');
      return _authBasic(encodedString);
    default:
      console.log('Error');
      return _authError();
    }

  } catch(e) {
    return _authError();
  }

  function _authBasic(authString) {
    let base64Buffer = Buffer.from(authString,'base64'); // <Buffer 01 02...>
    let bufferString = base64Buffer.toString(); // john:mysecret
    let [username,password] = bufferString.split(':');  // variables username="john" and password="mysecret"
    let auth = [username,password];  // {username:"john", password:"mysecret"}
    return User.authenticateBasic(auth)
      .then( user => _authenticate(user));
  }

  function _authenticate(user) {
    if ( user ) {
      req.token = user.generateToken();
      next();
    }
    else {
      _authError();
    }
  }

  function _authError() {
    next({status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password'});
  }

};

module.exports = authenticate;
