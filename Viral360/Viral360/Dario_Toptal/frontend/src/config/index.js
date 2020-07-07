const config = {
  auth0: {
    audience: 'UpriseApi',
    clientId: '94PAScwOcoGpQ0l59DRCuVfrESBxtMk3',
    domain: 'dev-j4635k7z.us.auth0.com',
    responseType: 'token',
    scope: 'openid profile email picture upriseapi',
  }
}

if (process.env.NODE_ENV === 'production') {
  var loc = window.location, ws_uri;

  if (loc.protocol === 'https:') {
  	ws_uri = 'wss:';
  } else {
  	ws_uri = 'ws:';
  }
  ws_uri += '//' + loc.host + '/ws';

  config.websocketUrl = ws_uri;
  config.serverUrl = '/';
} else {
  config.serverUrl = 'http://localhost:5000/';
  config.websocketUrl = 'ws://localhost:5000/ws';
}

config.apiUrl = config.serverUrl + 'api/';

export default config;
