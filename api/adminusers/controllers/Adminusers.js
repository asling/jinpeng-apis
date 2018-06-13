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
  	console.log("add ctx",ctx);
  	ctx.send("ok");
  },

  list: async (ctx,next) => {
  	ctx.send("ssss");
  }
};
