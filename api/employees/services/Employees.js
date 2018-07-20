'use strict';

/**
 * Employees.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all employees.
   *  query {Array} item => { type: where| orderBy... , key: , value: , }
   * @return {Promise}
   */

  fetchAll: async (query) => {
    // Convert `params` object to filters compatible with Mongo.
    const { name } = query;
    const whereObj = {};
    query.map( item => {
      if(item.type === 'where') whereObj[item.key] = item.value;
    });
    return Employees
      .where(whereObj)
      .fetchAll();
  },

  /**
   * Promise to fetch a/an employees.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const id = params._id;
    return Employees
      .where({id})
      .fetch();
    
  },

  /**
   * Promise to add a/an employees.
   *
   * @return {Promise}
   */

  add: async (body) => {
    // Extract values related to relational data.
    const now = new Date();
    return new Employees({
      name: body.name,
      phone: body.phone,
      title: body.title,
      updated_at: now,
      created_at: now,
    }).save(null, {method: 'insert'});
  },

  /**
   * Promise to edit a/an employees.
   *
   * @return {Promise}
   */

  edit: async (params, body) => {
    // Extract values related to relational data.
    const now = new Date();
    const id = params._id;
    return new Employees({
      name: body.name,
      phone: body.phone,
      title: body.title,
      updated_at: now,
      id,
    }).save(null, {method: 'update'});
  },

  /**
   * Promise to remove a/an employees.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Employees.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Employees
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Employees.associations.map(async association => {
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
