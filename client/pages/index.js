/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Container } from '@material-ui/core';
import Header from '../src/components/header/Header';
import BlogList from '../src/components/blog-list/BlogList';
import { BACKEND_URL } from '../src/global';

export default function Home({ data }) {
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    setBlogs(data.data);
  }, []);

  return (
    <Container>
      <Header blogs={data.data} setBlogs={setBlogs} />
      <BlogList blogs={blogs} />
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${BACKEND_URL}/api/v1/en/blogs`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}
