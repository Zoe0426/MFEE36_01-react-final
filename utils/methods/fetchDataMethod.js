const apiBaseURL = process.env.API_SERVER || 'http://localhost:3002';

const fetchDataMethod = async ({
  url,
  method = 'GET',
  token = '',
  body = null,
  contentType = 'application/json',
}) => {
  try {
    const options = {
      method,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': contentType,
      },
    };

    if (body) {
      if (contentType === 'application/json') {
        options.body = JSON.stringify(body);
      } else if (contentType === 'multipart/form-data') {
        options.body = body; // FormData 不需要轉換
      } else {
        options.body = body;
      }
    }

    const res = await fetch(`${apiBaseURL}${url}`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    // TODO: 錯誤處理的log儲存
    console.error('Fetch error:', error);
    throw error;
  }
};

export default fetchDataMethod;
