/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { getBlogDate } from '../../utils/dates';
import useBlogDetailStyles from './styles';
import { BACKEND_URL } from '../../global';
import { getAllComments } from '../../api/comments';
import CommentList from '../comment-list/CommentList';
import PreviewMarkdown from '../preview-markdown/PreviewMarkdown';

export default function BlogDetail({
  _id,
  title,
  description,
  body,
  tags,
  coverImage,
  author,
  createdAt,
}) {
  const classes = useBlogDetailStyles();
  const router = useRouter();

  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    getAllComments(_id)
      .then((data) => {
        setComments(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Typography variant="subtitle1" color="textSecondary" align="center">
        {getBlogDate(createdAt)}
      </Typography>
      <Typography variant="h4" align="center" className={classes.blogTitle}>
        {title}
      </Typography>
      <Grid container>
        <Grid item xs={12} lg={3} className={classes.blogLeftContainer}>
          <div className={classes.authorDetail}>
            <Avatar
              src={`${BACKEND_URL}/${author.image}`}
              alt={author.username}
            />
            <div>
              <Typography color="secondary">{author.username}</Typography>
              <Typography color="textSecondary" variant="body2">
                {getBlogDate(createdAt)}
              </Typography>
            </div>
          </div>

          <div>
            <Typography
              color="textSecondary"
              variant="body2"
              style={{ marginBottom: '4px' }}
            >
              DESCRIPTION
            </Typography>
            <Typography>{description}</Typography>
          </div>

          <div>
            <Typography color="textSecondary" variant="body2">
              TAGS
            </Typography>
            {tags.split(',').map((tag) => (
              <Typography
                key={tag}
                variant="button"
                color="primary"
                className={classes.blogTag}
              >
                {tag.toUpperCase()}
              </Typography>
            ))}
          </div>

          <div className={classes.backBtn} onClick={() => router.push('/')}>
            <Typography color="primary">
              <ArrowBackIcon />
              <span> Back to the blog </span>
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} lg={9} className={classes.blogRightContainer}>
          <div
            style={{
              background: `url(${`${BACKEND_URL}/${coverImage}`}) no-repeat center center/cover`,
            }}
          />
          <PreviewMarkdown source={body} />
          <CommentList
            comments={comments}
            setComments={setComments}
            blogId={_id}
          />
        </Grid>
      </Grid>
    </div>
  );
}
