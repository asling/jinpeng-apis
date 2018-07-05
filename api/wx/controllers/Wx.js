'use strict';
/**
 * A set of functions called "actions" for `Wx`
 */
module.exports = {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
  init: async (ctx, next) => {
    // try{
    //   const userInfo = await strapi.services.wx.auth();
    //   ctx.status = 200;

    // }catch(err){ 
    //   ctx.status = 500;
    // }
    var v = '222';
    var key = 'test';
    try{
      const nodecache = strapi.services.wx.getNodecache(key);
      nodecache.set(key,'111');
      v = nodecache.get(key);
    }catch(err){
      throw new Error(err);
    }
    
  	ctx.send(v);
  },

  //create a wechat menu
  //https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
   //   {
   //     "button":[
   //     {    
   //          "type":"click",
   //          "name":"今日歌曲",
   //          "key":"V1001_TODAY_MUSIC"
   //      },
   //      {
   //           "name":"菜单",
   //           "sub_button":[
   //           {    
   //               "type":"view",
   //               "name":"搜索",
   //               "url":"http://www.soso.com/"
   //            },
   //            {
   //                 "type":"miniprogram",
   //                 "name":"wxa",
   //                 "url":"http://mp.weixin.qq.com",
   //                 "appid":"wx286b93c14bbf93aa",
   //                 "pagepath":"pages/lunar/index"
   //             },
   //            {
   //               "type":"click",
   //               "name":"赞一下我们",
   //               "key":"V1001_GOOD"
   //            }]
   //       }]
   // }
  testOne: async (ctx, next) => {
    var v = '222';
    var key = 'test';
    try{
      const nodecache = strapi.services.wx.getNodecache(key);
      console.log("k",nodecache.keys());
      v = nodecache.get(key);
      console.log("v",v);
    }catch(err){
      console.log('err',err);
      throw new Error(err);
    }
    ctx.send(v);
  },

  createMenu: async (ctx, next) => {
    const menuInfo = ctx.request.body;
    const result = await strapi.services.wx.createMenu(menuInfo);
    ctx.status = 201;
    ctx.send("created");
  },
};
 