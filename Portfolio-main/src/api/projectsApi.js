import { apiFetch } from "./apiClient";


// =========================================================
// GET ALL PROJECTS
// Public API
// =========================================================

export async function getProjects() {
  const response = await apiFetch("/api/projects");

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return await response.json();
}


// =========================================================
// AUTH HEADERS FOR JSON REQUESTS
// =========================================================

function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}


// =========================================================
// CREATE PROJECT - JSON
// =========================================================

export async function createProject(project) {
  const response = await apiFetch("/api/projects", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  return await response.json();
}


// =========================================================
// UPDATE PROJECT - JSON
// =========================================================

export async function updateProject(id, project) {
  const response = await apiFetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  return await response.json();
}


// =========================================================
// DELETE PROJECT
// =========================================================

export async function deleteProject(id) {
  const token = localStorage.getItem("adminToken");

  const response = await apiFetch(`/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }
}


// =========================================================
// CREATE PROJECT + IMAGE
// Multipart FormData
// =========================================================

export async function createProjectWithImage(project, image) {

  const token = localStorage.getItem("adminToken");

  const formData = new FormData();

  // Convert project JSON into a Blob
  // Backend receives this as @RequestPart("project")
  formData.append(
    "project",
    new Blob(
      [JSON.stringify(project)],
      {
        type: "application/json",
      }
    )
  );

  // Backend receives this as @RequestPart("image")
  formData.append("image", image);

  const response = await apiFetch("/api/projects/upload", {
    method: "POST",

    // IMPORTANT:
    // Do NOT add Content-Type here.
    // Browser automatically creates:
    // multipart/form-data; boundary=....
    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  return await response.json();
}


// =========================================================
// UPDATE PROJECT + OPTIONAL IMAGE
// Multipart FormData
// =========================================================

export async function updateProjectWithImage(id, project, image) {

  const token = localStorage.getItem("adminToken");

  const formData = new FormData();

  // Project information
  formData.append(
    "project",
    new Blob(
      [JSON.stringify(project)],
      {
        type: "application/json",
      }
    )
  );

  // Image is optional during update
  if (image) {
    formData.append("image", image);
  }

  const response = await apiFetch(
    `/api/projects/${id}/upload`,
    {
      method: "PUT",

      // Again, don't set Content-Type manually.
      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  return await response.json();
}