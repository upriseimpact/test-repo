import React, { useContext, useEffect } from 'react';
import lock from '../security/lock';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import ApplicationContext from '../ApplicationContext';

import logo from '../assets/uprise-logo-large.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginPage() {
  const classes = useStyles();

  const applicationContext = useContext(ApplicationContext);

  function initiateLogin() {
    lock.checkSession({}, function(err, authResult) {
      if (err) {
        window.console.error(err);
      }

      if (authResult && authResult.accessToken) {
        applicationContext.onUserLogin(authResult);
      } else {
        lock.show();
      }
    });
  }

  useEffect(() =>{
    initiateLogin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src={logo} alt="Uprise logo" />
      </div>
    </Container>
  );
}

export default LoginPage;
