'use strict';

/**
 * Orders.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all orders.
   *
   * @return {Promise}
   */

  fetchAll: async (query) => {
    // Convert `params` object to filters compatible with Mongo.
    const whereObj = {}, fetchObj = {};
    query.map( item => {
      if(item.type === 'where') whereObj[item.key] = item.value;
      if(item.type === 'fetch') fetchObj[item.key] = item.value;
    });
    return Expenses
      .where(whereObj)
      .fetchAll(Object.assign({},fetchObj,{withRelated: ['customer_id']}));
  },

  /**
   * Promise to fetch a/an expenses.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const id = params._id;
    return Orders
      .where({id})
      .fetch({
        withRelated: ['customer_id']
      });
  },

  /**
   * Promise to add a/an orders.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Orders.associations.map(ast => ast.alias));
    const data = _.omit(values, Orders.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Orders.create(data);

    // Create relational data and return the entry.
    return Orders.updateRelations({ id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an orders.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Orders.associations.map(a => a.alias));
    const data = _.omit(values, Orders.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Orders.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Orders.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an orders.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Orders.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Orders
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Orders.associations.map(async association => {
        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  }
};
