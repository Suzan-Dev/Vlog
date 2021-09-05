import React from 'react';
import { useRouter } from 'next/router';
import { Box, Tab, Tabs, TextField } from '@material-ui/core';
import useAddBlogStyles from './styles';
import CustomButton from '../button/Button';
import PreviewMarkdown from '../preview-markdown/PreviewMarkdown';
import { alertFirstSentence } from '../../global';
import { addBlog } from '../../api/blogs';

export default function AddBlog() {
  const classes = useAddBlogStyles();
  const router = useRouter();

  const [value, setValue] = React.useState(0);
  const [values, setValues] = React.useState({
    title: '',
    description: '',
    coverImage: undefined,
    tags: '',
  });
  const [blogBody, setBlogBody] = React.useState('');

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBodyChange = (event) => {
    setBlogBody(event.target.value);
  };

  const handleFormData = (event) => {
    console.log(event.target.files);
    setValues({ ...values, coverImage: event.target.files[0] });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`markdown-tabpanel-${index}`}
        aria-labelledby={`markdown-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }

  const handleAddBlog = async () => {
    if (
      !values.title ||
      !values.description ||
      !values.coverImage ||
      !values.tags ||
      !blogBody
    ) {
      return alert(`${alertFirstSentence}Please fill up all the fields.`);
    }

    const addBlogData = await addBlog(blogBody, values);
    if (addBlogData.status === 'Success') {
      router.push('/');
    } else {
      alert(`${alertFirstSentence}${addBlogData.message}`);
    }
  };

  return (
    <div className={classes.inputFieldsContainer}>
      <div className={classes.uploadCoverBtn}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={handleFormData}
        />
        <label htmlFor="contained-button-file">
          <CustomButton component="span">Upload Cover Image</CustomButton>
        </label>
      </div>
      <div>
        <TextField
          variant="outlined"
          label="TITLE"
          value={values.title}
          onChange={handleChange('title')}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="DESCRIPTION"
          value={values.description}
          onChange={handleChange('description')}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="TAGS (Use comma to separate)"
          value={values.tags}
          onChange={handleChange('tags')}
        />
      </div>
      <div className={classes.blogBody}>
        <div>
          <Tabs value={value} onChange={handleTabChange} aria-label="markdown">
            <Tab label="Write" />
            <Tab label="Preview" />
          </Tabs>
        </div>
        {value === 0 && (
          <div className={classes.tabPanelOne}>
            <textarea
              className={classes.textArea}
              name="body"
              cols="30"
              rows="10"
              placeholder="Write your blog content here..."
              onChange={handleBodyChange}
              value={blogBody}
            ></textarea>
          </div>
        )}
        <TabPanel value={value} index={1} className={classes.tabPanelTwo}>
          <PreviewMarkdown source={blogBody} />
        </TabPanel>
      </div>
      <div className={classes.addBlogBtn}>
        <CustomButton onClick={handleAddBlog}>Add Blog</CustomButton>
      </div>
    </div>
  );
}
