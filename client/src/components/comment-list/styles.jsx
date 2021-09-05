import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  commentsContainer: {
    marginBottom: theme.spacing(5),

    '& > p': {
      fontSize: '19px',
      paddingBottom: theme.spacing(1.5),
      marginBottom: theme.spacing(3),
      borderBottom: '2px solid #eee',
    },
  },
  addCommentSection: {
    display: 'flex',
    marginBottom: theme.spacing(2),

    '& > textarea': {
      marginLeft: theme.spacing(2),
      minWidth: `calc(100% - ${theme.spacing(7)}px)`,
      minHeight: '200px',
      padding: theme.spacing(2),
      border: '2px solid rgba(0,0,0,0.25)',
      borderRadius: 5,

      '&:focus': {
        outline: 'none',
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
  },
  addCommentBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default useStyles;
