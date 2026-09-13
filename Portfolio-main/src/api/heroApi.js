import { apiFetch } from "./apiClient";

export async function getHero() {
  const response = await apiFetch("/api/hero");

  if (!response.ok) {
    throw new Error("Failed to fetch hero data");
  }

  return await response.json();
}

export async function updateHero(id, hero) {
  const token = localStorage.getItem("adminToken");

  const response = await apiFetch(`/api/hero/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(hero),
  });

  if (!response.ok) {
    throw new Error("Failed to update hero");
  }

  return await response.json();
}