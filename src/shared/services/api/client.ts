import * as auth from 'shared/services/auth';

import { IClientConfig } from './types';

const apiURL = process.env.REACT_APP_API_URL;

const client = async (
  endpoint: string,
  {
    data,
    token,
    headers: customHeaders,
    ...customConfig
  }: IClientConfig = {},
) => {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config as RequestInit)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        // refresh the page for them
        window.location.assign(window.location as any);
        return Promise.reject({ message: 'Please re-authenticate.' });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      return Promise.reject(data);
    });
};

export { client };
