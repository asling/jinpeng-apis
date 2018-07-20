'use strict';

/**
 * Customers.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all customers.
   *
   * @return {Promise}
   */

  fetchAll:  async (params, query) => {
    // Convert `params` object to filters compatible with Mongo.
    // const filters = strapi.utils.models.convertParams('customers', params);
    
    // console.log("Customers.associations",Customers.associations);
    // // Select field to populate.
    // const populate = Customers.associations
    //   .filter(ast => ast.autoPopulate !== false)
    //   .map(ast => ast.alias)
    //   .join(' ');
    //   console.log("populate",populate);
    const { recent, recentNum, page } = query;
    return Customers
      .forge()
      .orderBy("id","desc")
      // .limit(filters.limit)
      // .populate(populate)
      .fetchPage({
        limit: recent ? recentNum : false ,
        page,
        withRelated: ['employee_id']
      });
  },

  /**
   * Promise to fetch a/an customers.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    // const filters = strapi.utils.models.convertParams('customers', params);
    const id = params._id;
    return Customers
      .where({id})
      .fetch({
        withRelated: ['employee_id']
      });
  },

  /**
   * Promise to add a/an customers.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const now = new Date();
    return await Customers({
      name: values.name,
      phone: values.phone,
      wechat_number: values.wechat_number,
      employee_id: values.employee_id,
      create_at: now,
      update_at: now,
    }).save(null, {method: 'insert'})

  },

  /**
   * Promise to edit a/an customers.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Customers.associations.map(a => a.alias));
    const data = _.omit(values, Customers.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Customers.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Customers.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an customers.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Customers.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Customers
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Customers.associations.map(async association => {
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
