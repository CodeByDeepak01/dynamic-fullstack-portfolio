const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, options);

  // 401 = Authentication failed
  if (response.status === 401) {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");

    window.location.href = "/admin/login";

    throw new Error("Session expired. Please login again.");
  }

  // 403 = User is authenticated but not allowed
  if (response.status === 403) {
    throw new Error(
      "Access denied. You do not have permission to perform this action."
    );
  }

  return response;
}