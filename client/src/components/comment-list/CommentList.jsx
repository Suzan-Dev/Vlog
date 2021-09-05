import React from 'react';
// import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useCommentListStyles from './styles';
import CommentCard from '../comment-card/CommentCard';
import CustomButton from '../button/Button';

export default function CommentList({ comments }) {
  const classes = useCommentListStyles();
  // const router = useRouter();

  return (
    <div className={classes.commentsContainer}>
      <Typography>Comments ({comments.length})</Typography>
      <div>
        <div className={classes.addCommentSection}>
          <Avatar
            alt="Remy Sharp"
            src="http://localhost:8000/user-6132ec5f3d0d95b12642664e-1630727713654.jpeg"
          />
          <textarea
            name="comment"
            cols="30"
            rows="10"
            placeholder="Type your comment here..."
          ></textarea>
        </div>
        <div className={classes.addCommentBtn}>
          <CustomButton>Add Comment</CustomButton>
        </div>

        <div>
          {comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
