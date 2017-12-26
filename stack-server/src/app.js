import http from 'http'
import { env, mongo, port, ip } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import api from './api'

import User, { schema } from './api/user/model'

const app = express(api)
const server = http.createServer(app)


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user){
    done(null, user);
  })
});

mongoose.connect(mongo.uri)

setImmediate(() => {
  server.listen(port, ip, () => { console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env) })
})

passport.use(new GoogleStrategy({
  clientID: "CID",
  clientSecret: "CIS",
  callbackURL: 'callbackURL'
}, function(accessToken, refreshToken, profile, cb){
  User.findOne({authId : profile.id}).then(function(docs){
    if (docs){
      return cb(null, docs);
    } else {
      User.create({ email: profile.emails[0].value, authId: profile.id, name: profile.displayName }, function (err, small) {
        return cb(err, small);
      })
    }
  });
}))

export default app
