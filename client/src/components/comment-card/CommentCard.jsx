import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useCommentCardStyles from './styles';
import { BACKEND_URL } from '../../global';
import { getBlogDate } from '../../utils/dates';
import { Hidden } from '@material-ui/core';

export default function CommentCard({ comment }) {
  const classes = useCommentCardStyles();

  return (
    <div className={classes.commentCardContainer}>
      <Avatar
        alt={comment.author.username}
        src={`${BACKEND_URL}/${comment.author.image}`}
      />
      <div>
        <div>
          <Typography color="primary" className={classes.authorName}>
            {comment.author.username}
          </Typography>
          <Hidden xsDown>
            <Typography color="textSecondary" variant="caption">
              {getBlogDate(comment.createdAt)}
            </Typography>
          </Hidden>
        </div>
        <Typography>{comment.body}</Typography>
      </div>
    </div>
  );
}
