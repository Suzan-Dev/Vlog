import React from 'react';
// import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useCommentListStyles from './styles';
import CommentCard from '../comment-card/CommentCard';
import CustomButton from '../button/Button';
import { BACKEND_URL } from '../../global';
import { getUserDetails } from '../../utils/storage';

export default function CommentList({ comments }) {
  const classes = useCommentListStyles();
  // const router = useRouter();

  const [userDetails, setUserDetails] = React.useState(null);

  React.useEffect(() => {
    setUserDetails(getUserDetails());
  }, []);

  return (
    <div className={classes.commentsContainer}>
      <Typography>Comments ({comments.length})</Typography>
      <div>
        <div className={classes.addCommentSection}>
          <Avatar
            alt={userDetails?.username || ''}
            src={
              userDetails?.image ? `${BACKEND_URL}/${userDetails?.image}` : ''
            }
          />
          <textarea
            name="comment"
            cols="30"
            rows="10"
            placeholder="Type your comment here..."
          ></textarea>
        </div>
        <div className={classes.addCommentBtn}>
          <CustomButton disabled={userDetails === null}>
            Add Comment
          </CustomButton>
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
