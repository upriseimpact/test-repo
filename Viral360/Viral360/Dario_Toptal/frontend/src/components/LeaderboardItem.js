import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Avatar,
} from '@material-ui/core';

const useStyles = makeStyles((/*theme*/) => ({
  leaderboardContainer: {
    width: '100%',
    margin: '5px'
  },
  leaderboardAvatar: {
    float: 'left',
    width: '15%'
  },
  leaderboardText: {
    float: 'left',
    fontSize: '12px',
    marginTop: '10px'
  },
  leaderboardIcons: {
    float: 'right',
    fontSize: '12px',
    marginTop: '10px'
  },
}));

function Rising() {
  return (
    <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height={15} width={15} viewBox="0 0 40 40" style={{verticalAlign: 'middle', color: 'teal'}}><g><path d="m31.4 27.1q0 0.6-0.5 1t-1 0.5h-20q-0.6 0-1-0.5t-0.4-1 0.4-1l10-10q0.4-0.4 1-0.4t1 0.4l10 10q0.5 0.5 0.5 1z" /></g></svg>
  );
}

function Falling() {
  return (

    <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height={15} width={15} viewBox="0 0 40 40" style={{verticalAlign: 'middle', color: 'red'}}><g><path d="m31.4 15.7q0 0.6-0.5 1l-10 10q-0.4 0.4-1 0.4t-1-0.4l-10-10q-0.4-0.4-0.4-1t0.4-1 1-0.4h20q0.6 0 1 0.4t0.5 1z" /></g></svg>
  );
}

function LeaderboardItem({ imageUrl, name, rising, number }) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.leaderboardContainer}>
        <div className={classes.leaderboardAvatar}>
          <Avatar alt={name} src={imageUrl} />
        </div>
        <div className={classes.leaderboardText}>
          {name}
        </div>
        <div className={classes.leaderboardIcons}>
          {rising &&
            <Rising />
          }
          {!rising &&
            <Falling />
          }
          {number}
        </div>
      </div>
      <div style={{clear: 'both'}} />
    </div>
  );
}

export default React.memo(LeaderboardItem);
