import request from "./request";

export async function signIn(login, password) {
  return request('/login', {
    method: 'POST',
    body: { login, password },
  });
}

export async function signUp(login, password) {
  return request('/register', {
    method: 'POST',
    body: { login, password },
  });
}

export async function signOut() {
  return request('/logout', {
    method: 'POST',
  });
}

export async function fetchMe() {
  try {
    return await request('/me');
  } catch (error) {
    return null;
  }
}
