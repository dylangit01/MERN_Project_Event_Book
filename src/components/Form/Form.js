import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [ postDate, setPostData ] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const dispatch = useDispatch();
  const post = useSelector(state => currentId ? state.posts.find(p => p._id === currentId) : null);

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if(post) setPostData(post);
  }, [ post ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(currentId) {
      dispatch(updatePost(currentId, { ...postDate, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postDate, name: user?.result?.name }));    // result is from localstorage Value object key
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' })
  };

  if(!user?.result?.name) {
    return (
      <Paper className={ classes.paper }>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own events and like other's events.
        </Typography>
      </Paper>
    )
  }

  return (
      <Paper className={ classes.paper }>
        <form autoComplete='off' noValidate className={ `${ classes.root } ${ classes.form }` } onSubmit={ handleSubmit }>
          {/*<Typography variant='h6'> { currentId ? 'Updating' : 'Creating' } an Event</Typography>*/ }

          {/*<TextField name='creator' variant='outlined' label='Creator' fullWidth*/ }
          {/*           value={ postDate.creator }*/ }
          {/*           onChange={ event => setPostData( { ...postDate, creator: event.target.value } ) }/>*/ }
          {/* Since having Login part, we dont need the creator in the form any more, instead, it will be the req: userId of the token in the localstorage*/ }

          <TextField name='title' variant='outlined' label='Title' fullWidth
                     value={ postDate.title }
                     onChange={ event => setPostData({ ...postDate, title: event.target.value }) }/>
          <TextField name='message' variant='outlined' label='Message' fullWidth multiline rows={ 4 }
                     value={ postDate.message }
                     onChange={ event => setPostData({ ...postDate, message: event.target.value }) }/>
          <TextField name='tags' variant='outlined' label='Tags' fullWidth
                     value={ postDate.tags }
                     onChange={ event => setPostData({ ...postDate, tags: event.target.value }) }/>
          <div className={ classes.fileInput }>
            <FileBase
              type='file'
              multiple={ false }
              onDone={ ({ base64 }) => setPostData({ ...postDate, selectedFile: base64 }) }
            />
          </div>
          <Button className={ classes.buttonSubmit } variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
          <Button variant='contained' color='secondary' size='small' onClick={ clear } fullWidth>Clear</Button>
        </form>
      </Paper>
  );
};

export default Form;
