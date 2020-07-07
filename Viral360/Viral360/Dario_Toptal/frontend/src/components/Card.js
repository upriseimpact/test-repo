import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  customCard: {
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px 0px #d2d2d2',
    borderRadius: '5px',
  },
}));

function Card({ children, ...rest }) {
  const classes = useStyles();

  return (
    <div className={classes.customCard} {...rest}>
      {children}
    </div>
  );
}

export default React.memo(Card);
