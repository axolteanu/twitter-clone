const userGateway = require('../services/user-gateway');
const tweetGateway = require('../services/tweet-gateway');

async function handleGet(req, res, next){
  try{
    let tweets = await tweetGateway.getTweets();
    res.json(tweets);
  }catch(e){
    console.log("Could not get tweets from database.")
    next(e);
  }
}

async function handlePost(req, res, next){
  try{
    let params = new URLSearchParams(req.body);
    let userId = await userGateway.getUserId(params.get('userEmail'));
    if(userId != null)
      await tweetGateway.saveTweet(params.get('content'), userId);
    else
      throw new Error(`User with email '${params.get('userEmail')}' doesn't exist in the database.`);
  }catch(e){
    console.log("Could not save tweet to database.")
    next(e);
  }
}

module.exports = {
  handleGet,
  handlePost
}