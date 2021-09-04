import React from 'react';
import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useBlogCardStyles from './styles';
import { getBlogDate } from '../../utils/dates';
import { BACKEND_URL } from '../../global';

export default function BlogCard({
  title,
  slug,
  description,
  tags,
  coverImage,
  author,
  createdAt,
}) {
  const classes = useBlogCardStyles();
  const router = useRouter();

  const handleIndividualBlogRoute = () => {
    router.push(`/blog/${slug}`);
  };

  return (
    <div className={classes.cardShadow}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={`${BACKEND_URL}/${coverImage}`}
          title={title}
          onClick={handleIndividualBlogRoute}
        />
        <CardContent>
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
          <Typography
            variant="h6"
            className={classes.blogTitle}
            onClick={handleIndividualBlogRoute}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar
              className={classes.avatar}
              src={`${BACKEND_URL}/${author.image}`}
              alt={author.username}
            />
          }
          title={author.username}
          subheader={getBlogDate(createdAt)}
        />
      </Card>
    </div>
  );
}
