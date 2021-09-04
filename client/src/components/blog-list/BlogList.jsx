import { Grid } from '@material-ui/core';
import React from 'react';
import BlogCard from '../blog-card/BlogCard';
import useBlogListStyles from './styles';

export default function BlogList({ blogs }) {
  const classes = useBlogListStyles();

  return (
    <Grid container spacing={7}>
      {blogs.map(({ _id, ...otherProps }) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={_id}
          className={classes.blogCardGrid}
        >
          <BlogCard {...otherProps} />
        </Grid>
      ))}
    </Grid>
  );
}
