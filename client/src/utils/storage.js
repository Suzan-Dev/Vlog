export const getUserDetails = () => {
  return JSON.parse(localStorage.getItem('userDetails'));
};
