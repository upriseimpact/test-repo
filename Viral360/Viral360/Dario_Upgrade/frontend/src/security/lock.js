import config from '../config';
import Auth0Lock from 'auth0-lock';

const lock = new Auth0Lock(
  config.auth0.clientId,
  config.auth0.domain,
  {
    theme: {
      logo: 'https://uploads-ssl.webflow.com/5bcd229376071de1d612dd33/5bd93884d39e26ba45b8f1fc_Combined%20Shape.svg',
      primaryColor: '#0a50c9'
    },
    languageDictionary: {
      title: 'Uprise'
    },
    closable: false,
    auth: {
      audience: config.auth0.audience,
      redirectUrl: `${window.location.protocol}//${window.location.host}/login`,
      responseType: config.auth0.responseType,
      params: {
        scope: config.auth0.scope,
      },
    },
  },
);

export default lock;
