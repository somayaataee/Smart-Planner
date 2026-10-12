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

export const statisticsService = {
  async getProjectPerformance() {
    const response = await fetch(
      `${API_BASE_URL}/statistics/project-performance`,
    );
    return handleResponse(response);
  },

  async getProductivityMetrics(period = "daily") {
    const response = await fetch(
      `${API_BASE_URL}/statistics/productivity?period=${period}`,
    );
    return handleResponse(response);
  },

  async getHoursPerProject() {
    const response = await fetch(
      `${API_BASE_URL}/statistics/hours-per-project`,
    );
    return handleResponse(response);
  },

  async getDailyTaskCompletion() {
    const response = await fetch(
      `${API_BASE_URL}/statistics/daily-task-completion`,
    );
    return handleResponse(response);
  },

  async getTasksByProjectType() {
    const response = await fetch(
      `${API_BASE_URL}/statistics/tasks-by-project-type`,
    );
    return handleResponse(response);
  },

  async getPerformanceTable() {
    const response = await fetch(
      `${API_BASE_URL}/statistics/performance-table`,
    );
    return handleResponse(response);
  },

  async getFocusTimeAnalysis() {
    const response = await fetch(
      `${API_BASE_URL}/statistics/focus-time-analysis`,
    );
    return handleResponse(response);
  },
};
