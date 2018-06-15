const md5 = require('md5');
'use strict';

/**
 * `Adminusers` service.
 */

module.exports = {
  // exampleService: (arg1, arg2) => {
  //   return isUserOnline(arg1, arg2);
  // }
  hashPassword: (password) => {
  	return md5(password);
  },
  // dateCreated: (field) => {
  // 	return new Date().
  // }
};
