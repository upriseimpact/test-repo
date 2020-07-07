import React, { useContext } from 'react';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import Speed from '@material-ui/icons/Speed';
import Group from '@material-ui/icons/Group';
import Timeline from '@material-ui/icons/Timeline';

import Button from '../components/Button';

import logo from '../assets/uprise-logo-small.png';

import ApplicationContext from '../ApplicationContext';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  side: {
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #ecedef',
    padding: '20px 0',
    width: '80px',
    alignItems: 'center',
    backgroundColor: 'white',
    overflowY: 'auto',
    position: 'fixed',
    height: '100%'
  },
  main: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '85%'
  },
  header: {
    flex: 'none',
    borderBottom: '1px solid #ecedef',
    height: '70px',
    boxSizing: 'border-box',
  },
  headerLeft: {
    width: '85%',
    float: 'left'
  },
  headerRight: {
    width: '15%',
    float: 'right'
  },
  headerButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(4),
  },
  logoutButton: {
    marginTop: theme.spacing(2),
  },
  logoContainer: {
    marginBottom: '20px'
  },
  logo: {
    height: '40px',
  },
  menu: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    '& li': {
      color: '#404040',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    }
  }
}));

function Dashboard( {children }) {
  const classes = useStyles();

  const appContext = useContext(ApplicationContext);

  function logout() {
    appContext.onUserLogout()
  };

  return (
    <div className={classes.mainContent}>
      <div className={classes.side}>
        <div className={classes.logoContainer}>
          <img src={logo} className={classes.logo} alt="Uprise logo" />
        </div>
        <ul className={classes.menu}>
          <li>
            <Speed fontSize="large" />
          </li>
          <li>
            <Timeline fontSize="large" />
          </li>
          <li>
            <Group fontSize="large" />
          </li>
        </ul>
      </div>
      <div className={classes.main}>
        <div className={classes.header}>
          <div className={classes.headerLeft}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.headerButton}
              onClick={logout}
              disableElevation
            >
              START NEW CAMPAIGN
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.headerButton}
              onClick={logout}
              disableElevation
            >
              ADD ADVOCATES
            </Button>
          </div>
          <div className={classes.headerRight}>
            <Button
              variant="outlined"
              className={classes.logoutButton}
              startIcon={<HttpsOutlinedIcon />}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
        {children}
      </div>
    </div>
    );
}

export default Dashboard;
