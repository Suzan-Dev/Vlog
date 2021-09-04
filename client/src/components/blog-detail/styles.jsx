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
      marginRight: theme.spacing(5),
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
    marginTop: theme.spacing(5),
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
    padding: theme.spacing(0, 5),
  },
  mdEditorPreview: {
    boxShadow: 'none',
    margin: theme.spacing(4, 0),

    '& > div > div': {
      overflowY: 'hidden',
      height: 'fit-content',
    },
  },
}));

export default useStyles;
