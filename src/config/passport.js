import passport from 'passport';
import uuidv4 from 'uuid/v4';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { googleCredentials, facebookCredentials } from './socialMediaCredentials';

import models from '../models';

const { Users } = models;

passport.serializeUser((user, done) => done(null, user.userId));
passport.deserializeUser(async (id, done) => {
  const user = await Users.findOne({
    where: {
      userId: id
    }
  });
  return done(null, user);
});
passport.use(new GoogleStrategy({
  clientID: googleCredentials.clientID,
  clientSecret: googleCredentials.clientSecret,
  callbackURL: googleCredentials.callbackURL,
  passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
  try {
    const { _json: userDetails } = profile;
    const { email } = userDetails;
    const userData = await Users.findOne({
      where: { gmail: email },
      raw: true
    });
    let user = {};
    if (!userData) {
      user.notFound = 'user not found in database';
      user.userId = uuidv4();
    }
    if (userData) user = userData;
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.use(new FacebookStrategy(
  {
    clientID: facebookCredentials.clientID,
    clientSecret: facebookCredentials.clientSecret,
    callbackURL: facebookCredentials.callbackURL,
    profileFields: ['id', 'displayName', 'gender', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { _json: userDetails } = profile;
      const { email } = userDetails;
      const userData = await Users.findOne({
        where: { facebook: email },
        raw: true
      });
      let user = {};
      if (!userData) {
        user.notFound = 'user not found in database';
        user.userId = uuidv4();
      }
      if (userData) user = userData;
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));
