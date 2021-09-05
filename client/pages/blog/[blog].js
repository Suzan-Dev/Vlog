import React from 'react';
import { Container } from '@material-ui/core';
import Header from '../../src/components/header/Header';
import BlogDetail from '../../src/components/blog-detail/BlogDetail';
import Footer from '../../src/components/footer/Footer';
import { BACKEND_URL } from '../../src/global';

export default function Home({ data }) {
  return (
    <Container>
      <Header hideUnnecessaryField />
      <BlogDetail {...data.data} />
      <Footer />
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`${BACKEND_URL}/api/v1/en/blogs/${ctx.params.blog}`);
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
