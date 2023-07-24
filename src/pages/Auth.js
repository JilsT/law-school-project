import React, { useState, useContext } from 'react'

import LoginCard from '../components/loginCard';
import Input from '../components/Input';
import Button from '../components/button';
import { useHttpClient } from '../hooks/http-hook';
import { useForm } from '../hooks/form-hook';
import { AuthContext } from '../context/auth-context';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
  } from '../util/validators';

import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { sendRequest } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest("http://localhost:9000/login",
          'POST',
          JSON.stringify({
            email: event.target.email.value,
            password: event.target.password.value
          }),
          {
            'Content-Type': 'application/json'
          },
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {

      }
    } else {
      try {
        const responseData = await sendRequest("http://localhost:9000/signup",
          'POST',
          JSON.stringify({
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
          }),
          {
              "Content-Type": "application/json"
          },
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        console.log(err);
      }
    }
  };


  return (
    <React.Fragment>
      <LoginCard className="authentication">
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler} encType="multipart/form-data">
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              name="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            name="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            name="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button type="submit">
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </LoginCard>
    </React.Fragment>
  );
};

export default Auth;
