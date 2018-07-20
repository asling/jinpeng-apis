'use strict';

/**
 * Customers.js controller
 *
 * @description: A set of functions called "actions" for managing `Customers`.
 */

module.exports = {

  /**
   * Retrieve customers records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    ctx.body = await strapi.services.customers.fetchAll(ctx.params, ctx.request.query);
  },

  /**
   * Retrieve a customers record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]+$/)) {
      return ctx.notFound();
    }

    return strapi.services.customers.fetch(ctx.params);
  },

  /**
   * Create a/an customers record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    // const employee_name = ctx.request.body && ctx.request.body.employee_name;
    // const employee_id = await strapi.services.employees.queryIdByName()
    return strapi.services.customers.add(ctx.request.body);
  },

  /**
   * Update a/an customers record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.customers.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an customers record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.customers.remove(ctx.params);
  }
};
