'use strict';

/**
 * Expenses.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all expenses.
   *
   * @return {Promise}
   */

  fetchAll: (params,query) => {
    // Convert `params` object to filters compatible with Mongo.
    const { recent, recentNum } = query;
    return Expenses
      .forge()
      .orderBy("id","desc")
      .fetchPage({
        limit: recent ? recentNum : false ,
        withRelated: ['customer_id']
      });
  },

  /**
   * Promise to fetch a/an expenses.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const id = params._id;
    return Expenses
      .where({id})
      .fetch({
        withRelated: ['customer_id']
      });
  },

  /**
   * Promise to add a/an expenses.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Expenses.associations.map(ast => ast.alias));
    const data = _.omit(values, Expenses.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Expenses.create(data);

    // Create relational data and return the entry.
    return Expenses.updateRelations({ id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an expenses.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Expenses.associations.map(a => a.alias));
    const data = _.omit(values, Expenses.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Expenses.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Expenses.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an expenses.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Expenses.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Expenses
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Expenses.associations.map(async association => {
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
