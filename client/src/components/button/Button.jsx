import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textColor: {
    color: '#fff',
    textTransform: 'inherit',
    fontSize: 16,
  },
}));

export default function CustomButton(props) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      disableElevation
      {...props}
      className={classes.textColor}
    >
      {props.children}
    </Button>
  );
}
