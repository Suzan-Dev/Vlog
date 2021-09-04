import { Container } from '@material-ui/core';
import Header from '../src/components/header/Header';
import BlogCard from '../src/components/blog-card/BlogCard';

export default function Home() {
  return (
    <Container>
      <Header />
      <BlogCard />
    </Container>
  );
}
