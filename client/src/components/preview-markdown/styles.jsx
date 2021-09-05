import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mdContainer: {
    fontSize: '16px',
    lineHeight: 1.6,
    letterSpacing: 0.6,
    margin: theme.spacing(3, 0),
    overflowY: 'auto',
  },
  mdCodeBlock: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 5,
    padding: theme.spacing(1.5, 3),
    overflowX: 'auto',
  },
  mdInlineCode: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    borderRadius: 5,
    padding: theme.spacing(0.25, 0.5),
  },
  mdLink: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
  mdBlockQuote: {
    position: 'relative',
  },
  mdBlockQuoteFlag: {
    position: 'absolute',
    left: -40,
    top: 0,
    width: '5px',
    height: '100%',
    backgroundColor: theme.palette.secondary.light,
  },
}));

export default useStyles;
