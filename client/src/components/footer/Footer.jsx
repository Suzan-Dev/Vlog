import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Footer() {
  return (
    <Typography
      align="center"
      variant="body2"
      color="textSecondary"
      style={{
        borderTop: '2px solid #eee',
        padding: '30px 0',
      }}
    >
      &copy; {new Date().getFullYear()} VLOG. ALL RIGHTS RESERVED.
    </Typography>
  );
}
