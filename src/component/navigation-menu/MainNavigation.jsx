import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { NavLink } from "react-router-dom";
import { Avatar, LinearProgress } from '@mui/material';
import CommuteIcon from '@mui/icons-material/Commute';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { useDispatch, useSelector } from 'react-redux';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


// const pages1 = ['Pixel Manager', 'Facebook Pixel', 'Interest Finder', 'Catalog Manager', 'Pricing Plans', "FAQ's", 'Contact Us'];

function MainNavigation() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages =[
    {
      id: 1,
      title: 'Dashboard',
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M18.3694 9.59545C17.7494 4.81965 13.3722 1.45069 8.59637 2.07407C4.24636 2.63953 0.993222 6.34572 1.00004 10.7332C0.993222 13.1313 1.98109 15.4238 3.73199 17.0657C4.39284 17.6789 5.26829 18.0127 6.171 18.0025H13.27C14.2238 18.0059 15.1401 17.6312 15.8214 16.9636C17.7835 15.0491 18.7305 12.3172 18.3694 9.59545ZM14.7995 15.9178C14.3907 16.3197 13.8389 16.5446 13.2666 16.5446H6.16759C5.63619 16.5548 5.12182 16.364 4.72667 16.0063C3.26872 14.6404 2.44436 12.7294 2.45117 10.7298C2.45117 8.66209 3.33344 6.68977 4.87655 5.31017C6.20165 4.11452 7.92531 3.45708 9.70687 3.46048C9.99301 3.46048 10.2757 3.47751 10.5585 3.50817C14.544 3.97145 17.3986 7.57544 16.9353 11.561C16.7446 13.2165 15.9883 14.7528 14.7961 15.9178H14.7995ZM6.67515 13.8467C6.96129 14.126 6.9681 14.5893 6.68537 14.8754C6.40604 15.1616 5.94276 15.1684 5.65662 14.8856C3.3641 12.6374 3.32322 8.95845 5.57146 6.66593C6.66493 5.55203 8.16035 4.92184 9.7205 4.92184C9.99982 4.92184 10.2757 4.94228 10.5517 4.97975C10.9502 5.03766 11.2261 5.40555 11.1682 5.8041C11.1171 6.19925 10.756 6.47517 10.3609 6.42407C10.3541 6.42407 10.3507 6.42407 10.3439 6.42067C7.95937 6.08002 5.752 7.73555 5.41136 10.12C5.21379 11.4894 5.68388 12.8758 6.67515 13.8467ZM15.474 9.90203C15.5148 10.178 15.5319 10.4539 15.5319 10.7332C15.5353 12.2967 14.9051 13.799 13.781 14.8856C13.4948 15.165 13.0315 15.1616 12.7522 14.8754C12.4729 14.5893 12.4763 14.126 12.7624 13.8467C13.7571 12.8758 14.2306 11.486 14.0296 10.1098C13.9717 9.71127 14.2476 9.34338 14.6462 9.28547C15.0482 9.22756 15.416 9.50348 15.474 9.90203ZM11.1205 10.3619C11.3385 11.1488 10.8787 11.9629 10.0918 12.1809C9.30491 12.3989 8.49077 11.9391 8.27276 11.1522C8.05475 10.3653 8.51462 9.55117 9.3015 9.33316C9.56039 9.26162 9.83291 9.26162 10.0918 9.33316L12.8408 6.58417C13.1201 6.29463 13.58 6.28782 13.8695 6.56714C14.1591 6.84647 14.1659 7.30634 13.8866 7.59588C13.8797 7.6027 13.8763 7.60951 13.8695 7.61291L11.1205 10.3619Z" fill="currentColor"></path> </svg>,
      url:'/'
    },
    {
      id: 2,
      title: 'Car Categories',
      icon: <CommuteIcon />,
      url:'/car_categories'
    },
    {
      id: 3,
      title: 'Cars',
      icon: <DriveEtaIcon />,
      url:'/cars'
    }
  ];

  return (
    <AppBar position="sticky" color=''>
    {/* <Box sx={{ width: '100%' }}>
      <LinearProgress style={{ height: '2px' }} variant="determinate" value={progress} />
    </Box> */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLink 
                style={({isActive}) => {
                  return isActive? { background:'#ebf1ff', marginRight:'5px',marginLeft:'5px',  borderRadius:'5px', textDecoration: 'none' }: {marginRight:'5px',marginLeft:'5px', textDecoration: 'none'}
                }}
                key={page.id} 
                to={page.url}>
                <Button
                  key={page.id}
                  startIcon={page.icon}
                  onClick={handleCloseNavMenu}
                  sx={{ display: 'block', display:'flex', textTransform: 'none' }}
                >
                <NavLink 
                  style={({isActive}) => {
                    return isActive? {textDecoration: 'none', color:'#5b86e5' }: {color:'black',textDecoration: 'none'}
                  }}
                  key={page.id} 
                  to={page.url}>
                  {page.title}
                  </NavLink>
                </Button>
              </NavLink>
            ))}
          </Box>

          {/* onClick={()=>{ dispatch({ type: 'LOGOUT' })} */}

          <Box sx={{ flexGrow: 0 }}>
            <Button onClick={handleOpenUserMenu} sx={{ textTransform: 'none' }} >
              <MoreVertIcon />
            </Button>
          </Box>

          <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             
                  <Box sx={{ width: '200px', textAlign:'-webkit-center' }}>
                  <Avatar>
                    <PermIdentityIcon />
                  </Avatar>
                    <Box>
                      {user.name}
                    </Box>
                    <Box>
                      {user.username}
                    </Box>
                    
                  </Box>
                <MenuItem  onClick={()=>{ dispatch({ type: 'LOGOUT' })}}>
                  <Typography  textAlign="center">
                    Logout
                  </Typography>
                </MenuItem>
            
            </Menu>
        </Toolbar>
      
      </Container>
    </AppBar>
  );
}
export default MainNavigation;