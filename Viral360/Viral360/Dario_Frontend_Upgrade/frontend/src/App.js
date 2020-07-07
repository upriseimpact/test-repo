import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './Main';
import ApiContext from './ApiContext';
import ApplicationContext from './ApplicationContext';
import LoggedOutMain from './LoggedOutMain';
import loggedOutRoutes from './config/loggedOutRoutes';
import loggedInRoutes from './config/loggedInRoutes';
import createApi from './upriseApi';
import lock from './security/lock'

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      contrastText: '#fff',
      dark: '#3C4858',
      light: '#7986cb',
      main: '#6680fc'
    },
    secondary: {
      contrastText: '#6680fc',
      dark: '#c51162',
      light: '#ff4081',
      main: '#fff'
    }
  },
});

function loadUserFromStorage() {
  return JSON.parse(localStorage.getItem('uprise.user'));
}

function deleteUserFromStorage() {
  localStorage.removeItem('uprise.user');
}

function saveUserToStorage(user) {
  if (!user) {
    deleteUserFromStorage();
  } else {
    localStorage.setItem('uprise.user', JSON.stringify(user));
  }
}

function getSavedAccessToken() {
  const user = loadUserFromStorage();
  if (user) {
    return user.accessToken;
  }

  return null;
}

const api = createApi(getSavedAccessToken());

function App() {
  const [user, setUser] = useState(loadUserFromStorage());

  const isUserLoggedIn = !!user && !!user.accessToken;

  function onUserLogout() {
    api.setAccessToken(null);
    deleteUserFromStorage();
    setUser(null);
    lock.logout();
  }
  function onUserLogin(user) {
    if (user) {
      api.setAccessToken(user.accessToken);
      saveUserToStorage(user);
      setUser(user);
    } else {
      onUserLogout();
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <CssBaseline />
        <ApiContext.Provider value={{
          api
        }}>
          <ApplicationContext.Provider value={{
            user,
            onUserLogin,
            onUserLogout,
          }}>
            <BrowserRouter>
              {!isUserLoggedIn ?
                <LoggedOutMain>
                  {loggedOutRoutes}
                </LoggedOutMain> :
                <Main>
                  {loggedInRoutes}
                </Main>
              }
            </BrowserRouter>
          </ApplicationContext.Provider>
        </ApiContext.Provider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
