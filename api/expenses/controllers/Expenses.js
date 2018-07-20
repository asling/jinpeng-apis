'use strict';

/**
 * Expenses.js controller
 *
 * @description: A set of functions called "actions" for managing `Expenses`.
 */

module.exports = {

  /**
   * Retrieve expenses records.
   *
   * @return {Object|Array}
   */
  find: async (ctx) => {
    const query = ctx.request.query;
    const formData = Object.keys(query).map( item => {
      if(item === 'name') return { type: 'where', key: item, value: query.item };
      if(item === 'offset') return { type: 'fetch', key: item, value: query.item };
    });
    console.log("formData",formData);
    ctx.body = await strapi.services.expenses.fetchAll(formData);
  },

  /**
   * Retrieve a expenses record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]+$/)) {
      return ctx.notFound();
    }

    return strapi.services.expenses.fetch(ctx.params);
  },

  /**
   * Create a/an expenses record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.expenses.add(ctx.request.body);
  },

  /**
   * Update a/an expenses record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.expenses.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an expenses record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.expenses.remove(ctx.params);
  }
};
