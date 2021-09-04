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

export default function Header({
  blogs = [],
  setBlogs = () => {},
  hideSearchField = false,
}) {
  const classes = useHeaderStyles();
  const router = useRouter();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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
      <MenuItem className={classes.mobilePopoverItem}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem className={classes.mobilePopoverItem}>
        <IconButton
          aria-label="add new blog"
          aria-controls="primary-add-blog-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AddCircleOutlineIcon />
        </IconButton>
        <p>Add Blog</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={`${classes.grow} ${classes.topHeader}`}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar disableGutters>
          <div className={classes.headerIcon} onClick={() => router.push('/')}>
            <div>
              <Image src="/logo.svg" alt="Logo" width={30} height={30} />
            </div>
            <Typography className={classes.title} variant="h6" noWrap>
              log
            </Typography>
          </div>
          {!hideSearchField && (
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
            <IconButton aria-label="add new blog" color="primary">
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
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
