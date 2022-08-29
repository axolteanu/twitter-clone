const userGateway = require('../services/user-gateway');
const tweetGateway = require('../services/tweet-gateway');

module.exports.handle = async function(req, res, next){
  try{
    let params = new URLSearchParams(req.body);
    let userId = await userGateway.getUserId(params.get('userEmail'));
    if(userId != null)
      await tweetGateway.saveTweet(params.get('content'), userId);
    else
      throw new Error(`User with email '${params.get('userEmail')}' doesn't exist in the database.`);
  }catch(e){
    console.log("Could not save tweet to dabatase.")
    next(e);
  }
}