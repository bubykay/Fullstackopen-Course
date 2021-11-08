import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { AppBar, Toolbar , Typography, CssBaseline, makeStyles } from '@material-ui/core';



import { logout } from '../reducers/loginReducer';
// import Toggable from '../components/Toggable';
// import LoginForm from '../components/LoginForm';
const NavBar = () => {
    const dispatch = useDispatch();
    const login = useSelector(state => state.login);
    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(logout());
    };

    const useStyles = makeStyles((theme) => ({
        navlinks: {
            marginLeft: theme.spacing(10),
            display: 'flex',
        },
        logo: {
            flexGrow: '1',
            cursor: 'pointer',
        },
        link: {
            textDecoration: 'none',
            color: 'white',
            fontSize: '20px',
            marginLeft: theme.spacing(10),
            '&:hover': {
                color: 'yellow',
                borderBottom: '1px solid white',
            },
        },
        navText: {
            textDecoration: 'none',
            color: 'white',
            fontSize: '15px',
            marginLeft: theme.spacing(10),

        },
        linkText: { color:'white' , textDecoration:'none' }
    }));

    const classes = useStyles();


    return (
        <AppBar position='fixed' >
            <CssBaseline />
            <Toolbar variant='dense'>
                <Typography variant="h6" color="inherit" className={classes.logo}>
                  NabBar
                </Typography>


                <div className={classes.navlinks}>
                    <Link to='/' className={classes.link} >Blogs</Link>
                    <Link to='/users' className={classes.link}>Users</Link>

                    <div>
                        {login?
                            <div className={classes.navText}>
                                {login.name} logged in
                                <Link className={classes.linkText} onClick={handleLogout} id='logoutButton'> Sign out </Link>
                            </div>

                            :<>
                                <Link className={classes.linkText} to='/login'>Sign in</Link>
                            </>}
                    </div>
                </div>

            </Toolbar>

        </AppBar>
    );
};

export default NavBar;
