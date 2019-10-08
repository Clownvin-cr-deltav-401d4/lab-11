'use strict';

const express = require('express');
const router = express.Router();

router.get('/books', handleGetAll);
router.get('/books/:id', handleGetOne);

/**
 * Gets all the books.
 * @param {*} req the request
 * @param {*} res the response
 * @param {*} next function to call next middleware
 */
function handleGetAll(req, res, next) {
  if (!req.token) {
    res.status(401).json({status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password'});
  }
  let books = {
    count: 3,
    results: [
      { title:'Moby Dick' },
      { title:'Little Women' },
      { title: 'Eloquent Javascript' },
    ],
  };
  res.status(200).json(books);
}

/**
 * Gets a single book
 * @param {*} req the request
 * @param {*} res the response
 * @param {*} next function to call next middleware
 */
function handleGetOne(req, res, next) {
  if (!req.token) {
    res.status(401).json({status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password'});
  }
  let book = {
    title:'Moby Dick',
  };
  res.status(200).json(book);
}

module.exports = router;
