/**
 * `isAuthenticated` policy.
 */

module.exports = async (ctx, next) => {
  // Add your own logic here.
  console.log('isAuthenticatedIn isAuthenticated policy.');
  console.log("isAuthenticatedctx.session.isAuthenticated",ctx.session);
  if(ctx.session.isAuthenticated === true){
  	return await next();
  }
  ctx.unauthorized(`You're not logged in!`);
};
