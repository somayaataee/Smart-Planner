const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

export const taskService = {
  async getAllTasks() {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    return handleResponse(response);
  },

  async toggleTask(id) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/toggle`, {
      method: "POST",
    });
    return handleResponse(response);
  },

  async deleteTask(id) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  async addTask(task) {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return handleResponse(response);
  },

  async getSchedule() {
    const response = await fetch(`${API_BASE_URL}/tasks/schedule`);
    return handleResponse(response);
  },
};
