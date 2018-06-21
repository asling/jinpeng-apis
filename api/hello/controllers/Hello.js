module.exports = {
  // GET /hello
  index: async (ctx,next) => {
  	console.log("ctx");
    ctx.send('Hello World!');
  }
};