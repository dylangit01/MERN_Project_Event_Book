import React from 'react';
import Post from './Post/Post';
import useStyles from './styles'

import {Grid, CircularProgress} from "@material-ui/core";

import {useSelector} from 'react-redux';

const Posts = ({ setCurrentId, setShowAddEvent }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  // console.log(posts);

  return (
    !posts.length ? <CircularProgress/> : (
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        {posts.slice(0).reverse().map(post => (
          <Grid key={post._id} item xs={12} xm={6} md={6}>
            <Post post={post} setCurrentId = {setCurrentId} setShowAddEvent={setShowAddEvent} />
          </Grid>
        ))}
      </Grid>
    )
  )
};

export default Posts;
