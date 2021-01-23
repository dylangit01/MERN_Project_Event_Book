import React from 'react'
import { Button } from '@material-ui/core'
import useStyles from './styles'
import {Link} from 'react-router-dom'

const About = () => {
  const classes = useStyles()
  return(
    <div className={classes.about}>
      <h4 style={{color: "#0a043c"}}>Version 3.0.0</h4>
      <a className={classes.portLink} href="https://dylan-du-portfolio.netlify.app/" target='_blank' rel="noreferrer">Welcome to my portfolio</a>
      <Button component={Link} to='/' variant='contained' color='primary' style={{color: '#f4f4f4'}}>Go Back</Button>
    </div>
  )
}

export default About
