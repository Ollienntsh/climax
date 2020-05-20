const endpoint = process.env.REACT_APP_ENDPOINT || '';

export const getReport = () => {
  return fetch(endpoint);
};
