import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useHeaderStyles from './styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SortBlog from '../sort-blog/SortBlog';
import { Avatar } from '@material-ui/core';
import { alertFirstSentence, BACKEND_URL, TOKEN } from '../../global';
import { getUserDetails } from '../../utils/storage';

export default function Header({
  blogs = [],
  setBlogs = () => {},
  hideUnnecessaryField = false,
}) {
  const classes = useHeaderStyles();
  const router = useRouter();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [userDetails, setUserDetails] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchInput = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredBlogs = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm)
    );

    setBlogs(filteredBlogs);
  };

  const handleLogOut = () => {
    localStorage.removeItem('userDetails');
    document.cookie = `${TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    location.reload();
  };

  const handleAddBlog = () => {
    if (userDetails) {
      router.push('/blog/add-blog');
    } else {
      alert(`${alertFirstSentence}You need to be logged in.`);
    }
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {userDetails ? (
        <MenuItem className={classes.mobilePopoverItem} onClick={handleLogOut}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="primary"
          >
            <Avatar
              alt={userDetails.username}
              src={`${BACKEND_URL}/${userDetails.image}`}
              style={{
                height: 25,
                width: 25,
              }}
            />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      ) : (
        <MenuItem
          className={classes.mobilePopoverItem}
          onClick={() => router.push('/auth/login')}
        >
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="primary"
          >
            <AccountCircle />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      )}
      <MenuItem className={classes.mobilePopoverItem} onClick={handleAddBlog}>
        <IconButton
          aria-label="add new blog"
          aria-controls="primary-add-blog-menu"
          aria-haspopup="true"
          color="primary"
        >
          <AddCircleOutlineIcon />
        </IconButton>
        <p>Add Blog</p>
      </MenuItem>
    </Menu>
  );

  React.useEffect(() => {
    setUserDetails(getUserDetails());
  }, []);

  return (
    <div className={`${classes.grow} ${classes.topHeader}`}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar disableGutters>
          <div className={classes.headerIcon} onClick={() => router.push('/')}>
            <div>
              <Image src="/logo.svg" alt="Logo" width={20} height={20} />
            </div>
            <Typography className={classes.title} variant="h5" noWrap>
              log
            </Typography>
          </div>
          {!hideUnnecessaryField && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchInput}
              />
            </div>
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {!hideUnnecessaryField && (
              <SortBlog blogs={blogs} setBlogs={setBlogs} />
            )}
            <IconButton
              aria-label="add new blog"
              color="primary"
              onClick={handleAddBlog}
            >
              <AddCircleOutlineIcon />
            </IconButton>
            {userDetails ? (
              <>
                <IconButton
                  aria-label="logout"
                  color="primary"
                  onClick={handleLogOut}
                >
                  <ExitToAppIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  color="primary"
                >
                  <Avatar
                    alt={userDetails.username}
                    src={`${BACKEND_URL}/${userDetails.image}`}
                    style={{
                      height: 30,
                      width: 30,
                    }}
                  />
                </IconButton>
              </>
            ) : (
              <IconButton
                edge="end"
                aria-label="account of current user"
                color="primary"
                onClick={() => router.push('/auth/login')}
              >
                <AccountCircle
                  style={{
                    height: 30,
                    width: 30,
                  }}
                />
              </IconButton>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
