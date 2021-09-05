import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  blogTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(5),
  },
  blogLeftContainer: {
    '& > div:not(:nth-child(4))': {
      borderBottom: '2px solid #eee',
      padding: theme.spacing(5, 0),
    },

    [theme.breakpoints.up('lg')]: {
      '& > div:not(:nth-child(4))': {
        marginRight: theme.spacing(5),
      },
    },
  },
  authorDetail: {
    display: 'flex',
    alignItems: 'center',

    '& > div': {
      marginRight: theme.spacing(2),
    },
  },
  blogTag: {
    marginRight: theme.spacing(1),
  },
  backBtn: {
    margin: theme.spacing(5, 0),
    cursor: 'pointer',
    display: 'inline-block',

    '& > p': {
      display: 'flex',
      alignItems: 'center',

      '& > span': {
        marginLeft: theme.spacing(1),
      },
    },
  },
  blogRightContainer: {
    '& > div:first-child': {
      height: '250px',
    },

    [theme.breakpoints.up('sm')]: {
      '& > div:first-child': {
        height: '400px',
      },
    },

    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(0, 5),
    },
  },
}));

export default useStyles;
