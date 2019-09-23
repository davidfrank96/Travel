import 'dotenv/config';

const googleCredentials = {};
const facebookCredentials = {};

if (process.env.NODE_ENV === 'production') {
  googleCredentials.clientID = process.env.CLIENTID_PROD;
  googleCredentials.clientSecret = process.env.CLIENTSECRET_PROD;
  googleCredentials.callbackURL = process.env.GOOGLE_CALLBACK_URL_PROD;
  facebookCredentials.clientID = process.env.FACEBOOK_CLIENTID_PROD;
  facebookCredentials.clientSecret = process.env.FACEBOOK_CLIENTSECRET_PROD;
  facebookCredentials.callbackURL = process.env.FACEBOOK_CALLBACK_URL_PROD;
} else {
  googleCredentials.clientID = process.env.CLIENTID_TEST;
  googleCredentials.clientSecret = process.env.CLIENTSECRET_TEST;
  googleCredentials.callbackURL = process.env.GOOGLE_CALLBACK_URL_TEST;
  facebookCredentials.clientID = process.env.FACEBOOK_CLIENTID_TEST;
  facebookCredentials.clientSecret = process.env.FACEBOOK_CLIENTSECRET_TEST;
  facebookCredentials.callbackURL = process.env.FACEBOOK_CALLBACK_URL_TEST;
}

export { googleCredentials, facebookCredentials };
