import { apiFetch } from "./apiClient";

export async function getAbout() {
  const response = await apiFetch("/api/about");

  if (!response.ok) {
    throw new Error("Failed to fetch about data");
  }

  return await response.json();
}

export async function updateAbout(id, about) {
  const token = localStorage.getItem("adminToken");

  const response = await apiFetch(`/api/about/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(about),
  });

  if (!response.ok) {
    throw new Error("Failed to update about");
  }

  return await response.json();
}