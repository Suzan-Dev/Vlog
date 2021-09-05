import React from 'react';
import { Container } from '@material-ui/core';
import Header from '../../src/components/header/Header';
import AddBlog from '../../src/components/add-blog/AddBlog';
import Footer from '../../src/components/footer/Footer';

export default function AddBlogPage() {
  return (
    <Container>
      <Header hideUnnecessaryField />
      <AddBlog />
      <Footer />
    </Container>
  );
}
