const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

let isRefreshing = false;
let refreshQueue = [];

async function refreshToken() {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Refresh failed");
}

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const config = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  let res = await fetch(url, config);

  if (res.status === 401 && !endpoint.includes("/auth/")) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        await refreshToken();
        isRefreshing = false;
        refreshQueue.forEach((cb) => cb());
        refreshQueue = [];
        res = await fetch(url, config);
      } catch {
        isRefreshing = false;
        refreshQueue = [];
        window.location.href = "/login";
        throw new Error("Session expired");
      }
    } else {
      await new Promise((resolve) => refreshQueue.push(resolve));
      res = await fetch(url, config);
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const api = {
  get: (endpoint) => request(endpoint, { method: "GET" }),
  post: (endpoint, body) => request(endpoint, { method: "POST", body }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
