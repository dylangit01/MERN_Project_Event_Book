import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import useStyles from './styles'

const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={ classes.footer }>
      <p>Copyright &copy; Dylan Du 2021</p>
      <Button
        component={ Link }
        to='/about'
        variant='contained'
        color='primary'
        style={ { color: '#f4f4f4' } }
      >
        ABOUT
      </Button>
    </footer>
  )
}

export default Footer;

