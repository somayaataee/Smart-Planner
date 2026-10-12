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

export const habitService = {
  async getAllHabits() {
    const response = await fetch(`${API_BASE_URL}/habits`);
    return handleResponse(response);
  },

  async getHabitById(id) {
    const response = await fetch(`${API_BASE_URL}/habits/${id}`);
    return handleResponse(response);
  },

  async toggleHabit(id, date) {
    const response = await fetch(`${API_BASE_URL}/habits/${id}/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: date.toISOString() }),
    });
    return handleResponse(response);
  },

  async getHabitStreaks() {
    const response = await fetch(`${API_BASE_URL}/habits/streaks`);
    return handleResponse(response);
  },

  async getConsistencyScore() {
    const response = await fetch(`${API_BASE_URL}/habits/consistency`);
    return handleResponse(response);
  },

  async getMonthlyData(year, month) {
    const response = await fetch(
      `${API_BASE_URL}/habits/calendar?year=${year}&month=${month}`,
    );
    return handleResponse(response);
  },
};
