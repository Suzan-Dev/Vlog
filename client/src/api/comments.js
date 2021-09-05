import { BACKEND_URL } from '../global';
import { getCookie } from '../utils/storage';

export const getAllComments = async (blogId) => {
  const res = await fetch(`${BACKEND_URL}/api/v1/en/blog/${blogId}/comments`);
  const data = await res.json();

  return data;
};

export const addComment = async (body, blogId) => {
  const res = await fetch(`${BACKEND_URL}/api/v1/en/blog/${blogId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie()}`,
    },
    body: JSON.stringify({ body }),
  });
  const data = await res.json();

  return data;
};
