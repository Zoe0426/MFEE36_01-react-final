import fetchDataMethod from '@/utils/methods/fetchDataMethod';
import makeSearchParamsMethod from '@/utils/methods/makeSearchParamsMethod';

const concatUrl = (params) => `/shop-api/${params}`;

const getProductListApi = async (url, token) => {
  const fetchOption = {
    url: concatUrl(`products${makeSearchParamsMethod(url)}`),
    method: 'GET',
    token: token,
  };
  return await fetchDataMethod(fetchOption);
};

const getSearchBrandListApi = async () => {
  const fetchOption = {
    url: concatUrl('search-brand-list'),
    method: 'GET',
  };
  return await fetchDataMethod(fetchOption);
};

const getLikeListApi = async (token) => {
  const fetchOption = {
    url: concatUrl('show-like-list'),
    method: 'GET',
    token: token,
  };
  return await fetchDataMethod(fetchOption);
};

const postLikeListApi = async (data, token) => {
  const fetchOption = {
    url: concatUrl('handle-like-list'),
    method: 'POST',
    token: token,
    body: { data },
  };
  return await fetchDataMethod(fetchOption);
};

const deleteLikeListApi = async (id, token) => {
  const fetchOption = {
    url: concatUrl(`like-list/${id}`),
    method: 'DELETE',
    token: token,
  };
  return await fetchDataMethod(fetchOption);
};

export {
  getProductListApi,
  getSearchBrandListApi,
  getLikeListApi,
  postLikeListApi,
  deleteLikeListApi,
};
