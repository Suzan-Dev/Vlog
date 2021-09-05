import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  commentCardContainer: {
    margin: theme.spacing(3, 0),
    display: 'flex',
    alignContent: 'center',

    '& > div:last-child': {
      marginLeft: theme.spacing(2),

      '& > div': {
        display: 'flex',
        alignItems: 'center',
      },
    },
  },
  authorName: {
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
