import { BACKEND_URL } from '../global';

export const loginUser = async (email, password) => {
  const res = await fetch(`${BACKEND_URL}/api/v1/en/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  return data;
};

export const signUpUser = async (username, email, password) => {
  const res = await fetch(`${BACKEND_URL}/api/v1/en/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();

  return data;
};
