import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { GoogleLogin } from "react-google-login";
import { FaGoogle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import { useDispatch } from "react-redux";

import useStyles from './styles';
import { AUTH } from "../../constants/actionTypes";

import { signup, signin } from '../../actions/auth';

const initialData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [ showPassword, setShowPassword ] = useState(false);
  const [ isSignup, setIsSignup ] = useState(false);
  const history = useHistory();
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData)
    if(isSignup) {
      dispatch(signup(formData, history))
    } else {
      dispatch(signin(formData, history))
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  };

  const switchMode = () => {
    setIsSignup((preIsSignup) => !preIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push('/');
    } catch( e ) {
      console.log(e)
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log('Google Sign In was unsuccessful, please try again')
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component='h1' variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                  <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                </>
              )}
            <Input name='email' label='Email Address' handleChange={handleChange} type='email'/>
            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'}
                   handleShowPassword={handleShowPassword}/>
            {isSignup && <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type='password'/>}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignup ? 'Sign UP' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId='411530278656-u453e1fstb4eb87r2e5n0si55mp3r31c.apps.googleusercontent.com'
            render={renderProps => (
              <Button variant='contained' className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick}
                      disabled={renderProps.disabled} startIcon={<FaGoogle/>}>
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />

          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account?  Sign In' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
