import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputFieldsContainer: {
    padding: theme.spacing(0),

    '& > div': {
      marginBottom: theme.spacing(3.5),

      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(5),
      },

      '& > div': {
        width: '100%',
      },
    },

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 7.5),
    },
  },
  uploadCoverBtn: {
    height: '225px',
    border: `3px dashed ${theme.palette.primary.main}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.up('sm')]: {
      height: '350px',
    },
  },
  input: {
    display: 'none',
  },
  blogBody: {
    backgroundColor: 'rgba(0,0,0,0.025)',
    borderRadius: 5,
  },
  tabPanelOne: {
    padding: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
  },
  tabPanelTwo: {
    padding: theme.spacing(0, 1, 0, 1),
    minHeight: '400px',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 3, 0, 3),
    },
  },
  textArea: {
    minHeight: '400px',
    minWidth: '100%',
    maxWidth: '100%',
    border: 'none',
    padding: theme.spacing(2),

    '&:focus': {
      outline: 'none',
    },
  },
  addBlogBtn: {
    display: 'flex',
    justifyContent: 'flex-end',

    '& > button': {
      padding: theme.spacing(1, 5),
      width: '100%',

      [theme.breakpoints.up('sm')]: {
        width: 'auto',
      },
    },
  },
}));

export default useStyles;
