module.exports = {
  // GET /hello
  index: async (ctx,next) => {
    ctx.send('Hello World!');
  },
  show: async (ctx, next) => {
    ctx.send('show show!'); 
  },
  test77: async (ctx, next) => {
    ctx.send('test test!'); 
  },
};