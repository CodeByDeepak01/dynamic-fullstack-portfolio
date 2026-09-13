import { apiFetch } from "./apiClient";

export async function getContact() {
  const response = await apiFetch("/api/contact");

  if (!response.ok) {
    throw new Error("Failed to fetch contact data");
  }

  return await response.json();
}

export async function updateContact(id, contact) {
  const token = localStorage.getItem("adminToken");

  const response = await apiFetch(`/api/contact/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(contact),
  });

  if (!response.ok) {
    throw new Error("Failed to update contact");
  }

  return await response.json();
}