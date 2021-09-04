import { BACKEND_URL } from '../global';

export const getAllComments = async (blogId) => {
  const res = await fetch(`${BACKEND_URL}/api/v1/en/blog/${blogId}/comments`);
  const data = await res.json();

  return data;
};
