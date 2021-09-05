import React from 'react';
// import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useCommentCardStyles from './styles';
import { BACKEND_URL } from '../../global';
import { getBlogDate } from '../../utils/dates';
import { Hidden } from '@material-ui/core';

export default function CommentCard({ comment }) {
  const classes = useCommentCardStyles();
  // const router = useRouter();

  return (
    <div className={classes.commentCardContainer}>
      <Avatar alt="Remy Sharp" src={`${BACKEND_URL}/${comment.author.image}`} />
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
