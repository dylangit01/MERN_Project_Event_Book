import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Container, Grid, Grow } from "@material-ui/core";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import { getPosts } from "../../actions/posts";
import useStyles from './styles'

const Home = () => {
  const classes = useStyles()
  const [ currentId, setCurrentId ] = useState(null);
  const [ showAddEvent, setShowAddEvent ] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts())
  }, [ dispatch ]);

  return (
    <Grow in>
      <Container>
        <Grid container justify='space-between' alignItems='stretch' spacing={ 1 }>
          <Grid item xs={ 12 } sm={ 4 }>
            <Button className={ classes.eventBtn } variant={showAddEvent ? 'outlined' : 'contained'} color={showAddEvent? 'secondary' : 'primary'} size='large' fullWidth
                    onClick={ () => setShowAddEvent(!showAddEvent) }
            >
              { showAddEvent ? 'Close' :
                <>
                  { currentId ? 'Updating' : 'Adding' } an Event
                </>
              }
            </Button>
            {
              showAddEvent && <Form currentId={ currentId } setCurrentId={ setCurrentId }/>
            }
          </Grid>
          <Grid item xs={ 12 } sm={ 7 }>
            <Posts setCurrentId={ setCurrentId } setShowAddEvent={setShowAddEvent}/>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
};

export default Home;


