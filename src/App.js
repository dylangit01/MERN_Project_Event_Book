import React, {useEffect, useState} from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import eventBook from './images/event.png';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './AppStyles';

import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts'

const App = () => {
  const classes = useStyles();

  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch]);

  return (
    <Container maxidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>Event Book</Typography>
        <img className={classes.image} src={eventBook} alt="eventBook" height='60'/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={4}>
              <Form currentId = {currentId} setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>

          </Grid>
        </Container>
      </Grow>
    </Container>
  )
};

export default App;
