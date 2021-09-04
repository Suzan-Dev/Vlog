import React from 'react';
import { Container } from '@material-ui/core';
import Header from '../../src/components/header/Header';
import { BACKEND_URL } from '../../src/global';

export default function Home({ data }) {
  return (
    <Container>
      <Header hideSearchField />
      Hello
    </Container>
  );
}

// export async function getServerSideProps() {
//   const res = await fetch(`${BACKEND_URL}/api/v1/en/blog`);
//   const data = await res.json();

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { data },
//   };
// }
