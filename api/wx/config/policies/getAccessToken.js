/**
 * `getAccessToken` policy.
 */
const request = require('superagent');
const nodecache = require("node-cache"); 
module.exports = async (ctx, next) => {
  // Add your own logic here.
 //  	const url = 'https://api.weixin.qq.com/cgi-bin/token';
 //  	request.get(url).send({grant_type:'client_credential',appid: APPID,secret:appsecret}).set('accept', 'json')
	// .end((err,res) => {
	// 	// res => {"access_token":"ACCESS_TOKEN","expires_in":7200}
	// 	if(err) ctx.badRequest({ error: 'get weixin access_token failed' })
	// 	if(res && res.access_token) {
	// 		return await next();
	// 	}else{
	// 		ctx.badRequest({error: `no access_token in response`});
	// 	}
	// }); 
	return await next();
};