import { apiFetch } from "./apiClient";

function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getSkills() {
  const response = await apiFetch("/api/skills");

  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }

  return await response.json();
}

export async function createSkill(skill) {
  const response = await apiFetch("/api/skills", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(skill),
  });

  if (!response.ok) {
    throw new Error("Failed to create skill");
  }

  return await response.json();
}

export async function updateSkill(id, skill) {
  const response = await apiFetch(`/api/skills/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(skill),
  });

  if (!response.ok) {
    throw new Error("Failed to update skill");
  }

  return await response.json();
}

export async function deleteSkill(id) {
  const token = localStorage.getItem("adminToken");

  const response = await apiFetch(`/api/skills/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete skill");
  }
}