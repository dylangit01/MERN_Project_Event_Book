import React from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import eventBook from './images/event.png';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './AppStyles';

const App = () => {
  const classes = useStyles();
  return (
    <Container maxidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>Event Book</Typography>
        <img className={classes.image} src={eventBook} alt="eventBook" height='60'/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
};

export default App;
