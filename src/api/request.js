const DEFAULT_API_BASE = 'http://localhost:8090/api';

function getApiBase() {
  return import.meta.env.VITE_API_URL ?? DEFAULT_API_BASE;
}

export default async function request(path, options = {}) {
  const { method = 'GET', body } = options;
  const headers = {};

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${getApiBase()}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const message = formatErrorDetail(data?.detail) || 'Request failed';
    throw new Error(message);
  }

  return data;
}

function formatErrorDetail(detail) {
  if (Array.isArray(detail)) {
    const messages = detail
      .map((item) => {
        if (!item) {
          return null;
        }
        if (typeof item === 'string') {
          return item;
        }
        const path = Array.isArray(item.loc)
          ? item.loc.filter((part) => part !== 'body').join('.')
          : '';
        const message = item.msg || 'Validation error';
        return path ? `${path}: ${message}` : message;
      })
      .filter(Boolean);
    return messages.join('; ');
  }
  if (typeof detail === 'string') {
    return detail;
  }
  return null;
}
