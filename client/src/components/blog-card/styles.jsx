import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardShadow: {
    maxWidth: 300,
    minWidth: 300,
    height: '100%',
  },
  root: {
    boxShadow: `0 3px 1px ${theme.palette.primary.light}`,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  blogTag: {
    marginRight: theme.spacing(1),
  },
  blogTitle: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1.5),
    cursor: 'pointer',
    lineHeight: 1.25,
  },
  cardHeader: {
    paddingTop: 0,
  },
}));

export default useStyles;
