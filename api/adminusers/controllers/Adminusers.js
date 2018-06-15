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
  update: async (ctx, next) => {
    console.log("add body",ctx.request.body);
    const { username, password } = ctx.request.body;

  	const adminusers = new Adminusers({username,password}).then(res => {
      ctx.send({
        code: 200,
        data:res,
        message: 'admin user created',
      });
    }).catch(err=>{
      console.log(err);
      ctx.send({
        code: -1,
        data:err,
        message: 'error',
      });
    })
  },

  create: async (ctx, next) => {
    console.log("add body",ctx.request.body);
    const { username, password } = ctx.request.body;
    const now = new Date();
    const result = await new Adminusers({
      username,
      password,
      "created_at": now, 
    }).save(null, {method: 'insert'}).then(res => {
      return ({
              code: 200,
              data:res,
              message: 'admin user created',
            });
    }).catch(err=>{
      return ({
              code: -1,
              data:err,
              message: 'error',
            });
    });
    console.log("res",result);
    return ctx.body = result;
  },

  list: async (ctx,next) => {
  	ctx.send("ssss");
  },

  find: async (ctx, next) => {
    new Adminusers({"id":1}).fetch().then(model => {
      console.log("model",model);
    }).catch(err => {
      if (err) {
        console.log("err",err);
      }
    });
  }
};
