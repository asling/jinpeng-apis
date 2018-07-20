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
    const query = ctx.request.query;
    const formData = Object.keys(query).map( item => {
      if(item === 'name') return { type: 'where', key: item, value: query.item };
    });
    console.log("formData",formData);
    ctx.body = await strapi.services.employees.fetchAll(formData);
  },

  /**
   * Retrieve a employees record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]+$/)) {
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
    ctx.body = await strapi.services.employees.add(ctx.request.body);
  },

  /**
   * Update a/an employees record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    ctx.body = await strapi.services.employees.edit(ctx.params, ctx.request.body) ;
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
