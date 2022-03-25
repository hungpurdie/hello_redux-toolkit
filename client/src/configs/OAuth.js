const OAuth = {
  github: {
    clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
    redirectUrl: process.env.REACT_APP_GITHUB_REDIRECT_URL,
  },
  facebook: {
    clientId: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
    redirectUrl: process.env.REACT_APP_FACEBOOK_REDIRECT_URL,
  },
  google: {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    redirectUrl: process.env.REACT_APP_GOOGLE_REDIRECT_URL,
  },
};

export default OAuth;
