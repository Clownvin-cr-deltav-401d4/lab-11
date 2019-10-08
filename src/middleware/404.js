'use strict';

/**
 * Handles any missing resources by sending a 404
 * @param {*} req the request
 * @param {*} res the response
 * @param {*} next function to call next middleware
 */
const handle404 = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};

module.exports = handle404;
