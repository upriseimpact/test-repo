import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((/*theme*/) => ({
  badgeContainer: {
    width: '100%'
  },
  badgeIcon: {
    float: 'left',
    width: '15%'
  },
  badgeText: {
    fontSize: '16px'
  },
  badgeDescription: {
    fontSize: '8px',
    color: '#adadad',
  }
}));

function Badge({ icon, label, description }) {
  const classes = useStyles();

  return (
    <div className={classes.badgeContainer}>
      <div className={classes.badgeIcon}>
        {icon}
      </div>
      <div className={classes.badgeText}>
        <div className={classes.badgeLabel}>
          {label}
        </div>
        <div className={classes.badgeDescription}>
          {description}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Badge);
