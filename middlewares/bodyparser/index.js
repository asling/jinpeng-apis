'use strict';

/**
 * Module dependencies
 */

var bodyParser = require('koa-bodyparser');

/**
 * CRON hook
 */

module.exports = strapi => {
  return {
    /**
     * Initialize the hook
     */

    initialize: function(cb) {
      console.log("initialize app",strapi.app);
      const app = strapi.app;
      app.use(bodyParser());
      cb();
    }
  };
};
