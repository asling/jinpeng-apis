'use strict';
const request = require('superagent');
const NodeCache = require("node-cache"); 
const _  = require("lodash");
const APPID = 'APPID';
const appsecret = 'dfdf';
/**
 * `Wx` service.
 */

const nodecache = new NodeCache({ stdTTL: 20, checkperiod: 25 } );
console.log("nodecache");

const requestWx = function(url,params,token){

}
const createMenuCore = function(data){
	const createMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN';
	return new Promise((resolve,reject) => {
		request.post(createMenuUrl).send({access_token:token,body: data}).set('accept', 'json')
			.end((err,res) => {
				if(err) reject(err);
				if(res && res.errcode === 0) {
					resolve(res);
				}else{
					reject('request error');
				}
			}); 
	});
}

module.exports = {
  // exampleService: (arg1, arg2) => {
  //   return isUserOnline(arg1, arg2);
  // }
  	auth: async () => {
  		
  	},
  	getUserInfo: () => {
  		
  	},

  	getNodecache: (key) => {
  		const keyMaps = nodecache.keys();
  		if(_.indexOf(keyMaps,key,0) > -1){
  			return nodecache;
  		}else{
  			nodecache.set(key,"init");
  			return nodecache;
  		}
  	},

  	createMenu: async (menuInfo) => {
  		return await createMenuCore();
  	},


};
