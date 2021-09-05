import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fcae1e',
    opacity: 0.85,
  },
  leftContainerContents: {
    padding: theme.spacing(15, 5),
    color: '#fff',
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    '& > div:first-child > h2': {
      marginBottom: theme.spacing(6),
    },

    '& > div:first-child > p': {
      marginBottom: theme.spacing(3),
      fontSize: '20px',
      fontWeight: 'bold',
      letterSpacing: 1,
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(15),
    },
  },
  leftContainerLogo: {
    display: 'flex',
    alignItems: 'center',

    '& > div > div': {
      height: 50,
      width: 50,
    },
  },
}));

export default useStyles;
