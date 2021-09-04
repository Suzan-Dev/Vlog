import React from 'react';
import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useCommentListStyles from './styles';
import { getBlogDate } from '../../utils/dates';
import { BACKEND_URL } from '../../global';

export default function BlogCard({ comments }) {
  const classes = useCommentListStyles();
  const router = useRouter();

  return (
    <div className={classes.commentsContainer}>
      <Typography>{comments.length}</Typography>
      <div>Hello</div>
    </div>
  );
}
