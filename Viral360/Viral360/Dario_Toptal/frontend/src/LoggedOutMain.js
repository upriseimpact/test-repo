import React from 'react';
import { Redirect } from 'react-router';

function LoggedOutMain({ children }) {
  return (
    <React.Fragment>
      <Redirect exact from="/" to="/login" />
      {children}
    </React.Fragment>
  );
}

export default LoggedOutMain;
