const BASE = "http://127.0.0.1:5000";

export const api = (path, options={}) =>
  fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  }).then(r => {
    if (!r.ok) throw new Error(`${r.status}`);
    return r.json();
  });

export const getCountries = () => api("/countries");
export const getBoard = () => api("/board");
