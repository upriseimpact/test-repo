import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import clsx from 'clsx';
import postal from 'postal';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import IconButton from '@material-ui/core/IconButton';
import { amber, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import Dashboard from './pages/Dashboard';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useSnackStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useSnackStyles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

let ajaxDeleteSubscription = null;
let ajaxErrorSubscription = null;
let ajaxSaveSubscription = null;

function Notifications() {
  const [deleteNotification, setDeleteNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);
  const [saveNotification, setSaveNotification] = useState(null);

  function subscribeChannesls() {
    ajaxDeleteSubscription = postal.subscribe({
      channel: 'ajax',
      topic: 'ajax.delete',
      callback: errorMessage => setSaveNotification(errorMessage)
    });
    ajaxErrorSubscription = postal.subscribe({
      channel: 'ajax',
      topic: 'ajax.error',
      callback: errorMessage => setErrorNotification(errorMessage)
    });
    ajaxSaveSubscription = postal.subscribe({
      channel: 'ajax',
      topic: 'ajax.save',
      callback: errorMessage => setSaveNotification(errorMessage)
    });
  }

  function unsubscribeChannels() {
    postal.unsubscribe(ajaxDeleteSubscription);
    postal.unsubscribe(ajaxErrorSubscription);
    postal.unsubscribe(ajaxSaveSubscription);
  }

  useEffect(() => {
    subscribeChannesls();
    return unsubscribeChannels;
  }, []);

  return (
    <React.Fragment>
      {
        !!errorNotification &&
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          autoHideDuration={3000}
          message={errorNotification}
          open={!!errorNotification}
          onClose={() => setErrorNotification(null)}
        >
          <MySnackbarContentWrapper
            onClose={() => setErrorNotification(null)}
            variant="error"
            message={errorNotification}
          />
        </Snackbar>
      }
      {
        !!saveNotification &&
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          autoHideDuration={3000}
          message={saveNotification}
          open={!!saveNotification}
          onClose={() => setSaveNotification(null)}
        >
          <MySnackbarContentWrapper
            onClose={() => setSaveNotification(null)}
            variant="success"
            message={saveNotification}
          />
        </Snackbar>
      }
      {
        !!deleteNotification &&
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          autoHideDuration={3000}
          message={deleteNotification}
          open={!!deleteNotification}
          onClose={() => setDeleteNotification(null)}
        >
          <MySnackbarContentWrapper
            onClose={() => setDeleteNotification(null)}
            variant="warning"
            message={deleteNotification}
          />
        </Snackbar>
      }
    </React.Fragment>
  );
}

function Main( { children } ) {
  return (
    <React.Fragment>
      <Redirect exact from="/login" to="/" />
      <Redirect exact from="/register" to="/" />
      <Dashboard>
        {children}
      </Dashboard>
      <Notifications />
    </React.Fragment>
  );
}

export default Main;
