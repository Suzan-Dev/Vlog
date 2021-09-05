import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    height: '100vh',
    display: 'flex',
  },
  leftContainer: {
    background: `url(${'/login.jpg'}) no-repeat center center/cover`,
    position: 'relative',
  },
  rightContainer: {
    letterSpacing: 1,
    padding: theme.spacing(15, 5),
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',

    '& > form': {
      margin: 'auto',

      [theme.breakpoints.up('sm')]: {
        width: '475px',
      },
    },

    '& > form > div': {
      display: 'flex',
      flexDirection: 'column',
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(15),
    },
  },
  demoLoginCredential: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: theme.spacing(2),
    borderRadius: 10,
    marginTop: theme.spacing(2),
  },
  cursorPointer: {
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row !important',
    alignItems: 'center',
  },
  rememberMe: {
    flexDirection: 'row !important',
    alignItems: 'center',
    margin: theme.spacing(6, 0, 2, 0),

    '& > span': {
      paddingLeft: 0,
    },
  },
  textField: {
    marginTop: theme.spacing(2.75),
  },
  smallScreenLogo: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStyles;
