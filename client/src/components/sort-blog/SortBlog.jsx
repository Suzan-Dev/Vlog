import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useSortBlogStyles from './styles';
import {
  BEST_MATCH,
  OLD_TO_NEW,
  NEW_TO_OLD,
  TITLE_A_TO_Z,
  TITLE_Z_TO_A,
} from '../../global';

export default function SortBlog({ blogs = [], setBlogs = () => {} }) {
  const classes = useSortBlogStyles();
  const [state, setState] = React.useState({
    filter: BEST_MATCH,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const sortBy = event.target.value;
    const clonedBlogsArr = [...blogs];

    const sortClonedBlogArr = (key, reverse = false) => {
      clonedBlogsArr.sort((a, b) => {
        if (a[key] > b[key]) {
          return 1;
        }
        if (a[key] < b[key]) {
          return -1;
        }
        return 0;
      });

      if (reverse) {
        clonedBlogsArr.reverse();
      }
    };

    switch (sortBy) {
      case BEST_MATCH:
        setBlogs(blogs);
        break;
      case OLD_TO_NEW:
        sortClonedBlogArr('createdAt');
        setBlogs(clonedBlogsArr);
        break;
      case NEW_TO_OLD:
        sortClonedBlogArr('createdAt', true);
        setBlogs(clonedBlogsArr);
        break;
      case TITLE_A_TO_Z:
        sortClonedBlogArr('title');
        setBlogs(clonedBlogsArr);
        break;
      case TITLE_Z_TO_A:
        sortClonedBlogArr('title', true);
        setBlogs(clonedBlogsArr);
        break;
      default:
        break;
    }

    setState(() => ({
      ...state,
      [name]: sortBy,
    }));
  };

  return (
    <div>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        size="small"
      >
        <Select
          native
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'filter',
          }}
        >
          <option value={BEST_MATCH}>Best Match</option>
          <option value={OLD_TO_NEW}>Old to New</option>
          <option value={NEW_TO_OLD}>New to Old</option>
          <option value={TITLE_A_TO_Z}>Title A to Z</option>
          <option value={TITLE_Z_TO_A}>Title Z to A</option>
        </Select>
      </FormControl>
    </div>
  );
}
