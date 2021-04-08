import React, { FC } from 'react';
import { isLoggedInVar } from '../apollo';

export const LoggedOutRouter: FC = () => {
  const onClick = () => {
    isLoggedInVar(true);
  };
  return (
    <div>
      <h1>Logged Out</h1>
      <button onClick={onClick}>Click to login</button>
    </div>
  );
};
