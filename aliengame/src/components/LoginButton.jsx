/* eslint-disable react/style-prop-object */
import React from "react";
import PropTypes from 'prop-types';
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();

  const button = {
    x: -300, 
    y: -600, 
    width: 600,
    height: 300,
    style: {
      fill: 'transparent',
      cursor: 'pointer',
    },
    onClick: props.authenticate,
  };
  const text = {
    textAnchor: 'middle', 
    x: 0, 
    y: -440, 
    style: {
      fontFamily: '"Joti One", cursive',
      fontSize: 45,
      fill: '#e3e3e3',
      cursor: 'pointer',
    },
  };
  return (
    <g filter="url(#shadow)">
      <rect {...button} />
      <text {...text} onClick={() => loginWithRedirect()}>
        Log In!
      </text>
    </g>
  );
};

LoginButton.propTypes = {
    authenticate: PropTypes.func.isRequired,
};

export default LoginButton;