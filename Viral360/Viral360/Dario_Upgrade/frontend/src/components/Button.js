import React from 'react';
import CircularProgress  from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

function CustomButton({ loading, disabled, children, ...rest }) {
  return (
    <Button disabled={loading || disabled} {...rest}>
      {loading ?
        <CircularProgress size={22} /> :
        <>{children}</>
      }

    </Button>
  );
}

export default React.memo(CustomButton);
