import React from 'react';

import './loginCard.css';

const LoginCard = props => {
  return (
    <div className={`loginCard ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default LoginCard;
