'use strict';

/**
 * Handles errors by responding with the appropriate status code and message.
 * @param {*} err the error
 * @param {*} req the request
 * @param {*} res the response
 * @param {*} next function to call next middleware
 */
const handleError = (err, req, res, next) => {
  console.error('__SERVER_ERROR__', err);
  let error = { error: err.message || err };
  res.statusCode = err.status || 500;
  res.statusMessage = err.statusMessage || 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};

module.exports = handleError;
