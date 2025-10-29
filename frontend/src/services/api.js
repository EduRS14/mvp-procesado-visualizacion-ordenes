const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export const fetchJSON = async (path, opts = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
};