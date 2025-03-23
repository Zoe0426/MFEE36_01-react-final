const makeSearchParamsMethod = (url) => {
  return `?${new URLSearchParams(url).toString()}`;
};

export default makeSearchParamsMethod;
