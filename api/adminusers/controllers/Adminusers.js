'use strict';

/**
 * A set of functions called "actions" for `Adminusers`
 */

module.exports = {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
  createOrUpdate: async (ctx, next) => {
  	console.log("add body",ctx.request.body);
    Adminusers.findOne({
      id: 1,
    }).exec((err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
    })
    
  	ctx.send("ok");
  },

  list: async (ctx,next) => {
  	ctx.send("ssss");
  }
};
