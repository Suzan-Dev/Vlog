import { BACKEND_URL } from '../global';
import { getCookie } from '../utils/storage';

export const addBlog = async (body, otherValuesObj) => {
  const { title, description, coverImage, tags } = otherValuesObj;
  const formData = new FormData();

  formData.append('title', title);
  formData.append('description', description);
  formData.append('coverImage', coverImage);
  formData.append('tags', tags);
  formData.append('body', body);

  const res = await fetch(`${BACKEND_URL}/api/v1/en/blogs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getCookie()}`,
    },
    body: formData,
  });
  const data = await res.json();

  return data;
};
