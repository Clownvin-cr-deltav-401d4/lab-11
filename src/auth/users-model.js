'use strict';

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('dotenv').config();

const users = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String},
  role: {type: String, required:true, default:'user', enum:['admin','editor','user'] },
});

users.pre('save', async function() {
  if (this.isModified('password'))
  {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

/**
 * Verifies a "Basic" authentication by checking that the password matches the stored password
 * @auth the auth string (username:password)
 */
users.statics.authenticateBasic = async function(auth) {
  let query = {username:auth[0]};
  let user = await this.findOne(query).catch(console.error);
  console.log(user, 'found from', query);
  const correctPass = await user.comparePassword(auth[1]);
  if (user && correctPass) {
    return user;
  }
};

/**
 * Compare a plain text password against the hashed one we have saved
 * @password compares this user documents password to the passed in password
 * @returns true if they match, false if not
*/
users.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

/**
 * Generates a new JWT for this user.
 */
users.methods.generateToken = function() {
  let tokenData = {
    id:this._id,
    capabilities: (this.acl && this.acl.capabilities) || [],
  };
  return jwt.sign(tokenData, process.env.SECRET || 'changeit' );
};

module.exports = mongoose.model('users', users);
