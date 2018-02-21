module.exports = {
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET
  },
  mongodb:{
    dbURI: process.env.DB_URI
  },
  session: {
    cookieKey: process.env.SESSION_COOKIE_KEY
  }
}
