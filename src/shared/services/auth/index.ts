/* eslint-disable @typescript-eslint/no-empty-function */
// TODO to be implemented
async function getToken() {
  // return window.localStorage.getItem(localStorageKey);
}
// TODO to be implemented
function handleUserResponse() {
  // return user;
}
// TODO to be implemented
function login() {}

// TODO to be implemented
function register() {}

// TODO to be implemented
async function logout() {}

// an auth provider wouldn't use your client, they'd have their own
// so that's why we're not just re-using the client
const authURL = process.env.REACT_APP_AUTH_URL;

//! this must be implemented if classic auth is used
const client = async (
  endpoint: string,
  data: Record<string, unknown>,
) => {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  };

  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      const responseData = await response.json();
      if (response.ok) {
        return responseData;
      }
      return Promise.reject(responseData);
    });
};

export { getToken, login, register, logout };
