import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Avatar, Button, IconButton, Toolbar, Typography, Drawer } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './styles';
import eventBook from '../../images/event.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { LOGOUT } from "../../constants/actionTypes";
import decode from 'jwt-decode';


const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
  // console.log(user);

  const [ mobileView, setMobileView ] = useState(false)

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push('/');
    setUser(null);
  };

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    return window.addEventListener("resize", setResponsiveness)
  }, []);

  useEffect(() => {
    const token = user?.token;
    if(token) {
      const decodedToken = decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) logout()
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
    // eslint-disable-next-line
  }, [ location ]);   // dependency array to avoid constant updating user data;

  const DisplayMobile = () => {
    const [ menuOpen, setMenuOpen ] = useState(false)
    const handleMenu = () => {
      setMenuOpen(!menuOpen)
    }

    const handleDrawerClose = () => {
      setMenuOpen(false)
    }

    const DrawerChoices = () => {
      if(user){
        return(
            <div className={classes.mobileDrawer}>
              <Avatar className={ classes.purple } alt={ user.result.name } src={ user.result.imageUrl }>{ user.result.name.charAt(0) }</Avatar>
              <Typography className={ classes.userName } variant='h6'>{ user.result.name }</Typography>
              <Button variant='outlined' color='secondary' onClick={ logout }>Logout</Button>
            </div>
          )
      } else return <Button style={{marginTop: '50px'}} component={ Link } to='/auth' variant='contained' color='primary'>Sign In </Button>
    }

    return (
      <Toolbar>
        <IconButton
          { ...{
            edge: "start",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleMenu
          } }
        >
          <MenuIcon/>
        </IconButton>
        <Typography component={ Link } to='/' className={ classes.heading } variant='h4' align='center'>Events</Typography>
        <img className={ classes.image } src={ eventBook } alt="eventBook" height='50'/>
        <Drawer
          { ...{
            anchor: 'left',
            open: menuOpen,
            onClose: handleDrawerClose,
          } }
        >
          <DrawerChoices/>
        </Drawer>
      </Toolbar>
    );
  };

  return (
    <AppBar className={ classes.appBar } position='static'>
      {
        mobileView ? <DisplayMobile/> :
          <>
            <div className={ classes.brandContainer }>
              <Typography component={ Link } to='/' className={ classes.heading } variant='h2' align='center'>Events</Typography>
              <img className={ classes.image } src={ eventBook } alt="eventBook" height='60'/>
            </div>
            <Toolbar className={ classes.toolbar }>
              {
                user ? (
                  <div className={ classes.profile }>
                    <Avatar className={ classes.purple } alt={ user.result.name } src={ user.result.imageUrl }>{ user.result.name.charAt(0) }</Avatar>
                    <Typography className={ classes.userName } variant='h6'>{ user.result.name }</Typography>
                    <Button variant='contained' color='secondary' onClick={ logout }>Logout</Button>
                  </div>
                ) : (
                  <Button component={ Link } to='/auth' variant='contained' color='primary'>Sign In </Button>
                )
              }
            </Toolbar>
          </>
      }
    </AppBar>
  );
};

export default Navbar;
