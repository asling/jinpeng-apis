'use strict';

/**
 * Employees.js controller
 *
 * @description: A set of functions called "actions" for managing `Employees`.
 */

module.exports = {

  /**
   * Retrieve employees records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    console.log("ctx.request.query",ctx.request.query);
    ctx.body = await strapi.services.employees.fetchAll(ctx.request.query);
  },

  /**
   * Retrieve a employees record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.employees.fetch(ctx.params);
  },

  /**
   * Create a/an employees record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.employees.add(ctx.request.body);
  },

  /**
   * Update a/an employees record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.employees.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an employees record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.employees.remove(ctx.params);
  }
};
