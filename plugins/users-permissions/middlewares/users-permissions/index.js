'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const _ = require('lodash');

module.exports = strapi => {
  return {
    beforeInitialize: function() {
      strapi.config.middleware.load.before.unshift('users-permissions');
    },

    initialize: function(cb) {
      _.forEach(strapi.config.routes, value => {
        if (_.get(value.config, 'policies')) {
          value.config.policies.unshift('plugins.users-permissions.permissions');
          const excludes = _.get(value, 'excludes') ? _.isArray(value.excludes) ? value.excludes : [value.excludes] : [];
          _.remove(value.config.policies, function(item){
            return _.indexOf(excludes, item, 0) > -1;
          });
        }
        
      });

      if (strapi.plugins) {
        _.forEach(strapi.plugins, (plugin, name) => {
          _.forEach(plugin.config.routes, value => {
            if (_.get(value.config, 'policies')) {
              value.config.policies.unshift('plugins.users-permissions.permissions');
            }
          });
        });
      }

      cb();
    }
  };
};
