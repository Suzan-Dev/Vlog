import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useCommentListStyles from './styles';
import CommentCard from '../comment-card/CommentCard';
import CustomButton from '../button/Button';
import { alertFirstSentence, BACKEND_URL } from '../../global';
import { getUserDetails } from '../../utils/storage';
import { addComment } from '../../api/comments';

export default function CommentList({
  comments = [],
  setComments = () => {},
  blogId = '',
}) {
  const classes = useCommentListStyles();

  const [userDetails, setUserDetails] = React.useState(null);
  const [commentBody, setCommentBody] = React.useState('');

  const handleAddComment = async () => {
    if (!commentBody) {
      return alert(
        `${alertFirstSentence}Please write down something before adding.`
      );
    }

    const commentData = await addComment(commentBody, blogId);
    if (commentData.status === 'Success') {
      const newCommentsArr = [...comments];
      newCommentsArr.push({
        ...commentData.data,
        author: {
          _id: userDetails._id,
          username: userDetails.username,
          image: userDetails.image,
        },
      });

      setComments(newCommentsArr);
      setCommentBody('');
    } else {
      alert(`${alertFirstSentence}${commentData.message}`);
    }
  };

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
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
          ></textarea>
        </div>
        <div className={classes.addCommentBtn}>
          <CustomButton
            disabled={userDetails === null}
            onClick={handleAddComment}
          >
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
