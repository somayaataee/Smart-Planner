import { useState, useEffect, useCallback } from "react";
import { taskService } from "../services/taskService.js";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAllTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const toggleTask = useCallback(
    async (id) => {
      try {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t,
          ),
        );
        await taskService.toggleTask(id);
        await fetchTasks();
      } catch (err) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t,
          ),
        );
        setError(err.message);
      }
    },
    [fetchTasks],
  );

  const deleteTask = useCallback(
    async (id) => {
      try {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        await taskService.deleteTask(id);
      } catch (err) {
        await fetchTasks();
        setError(err.message);
      }
    },
    [fetchTasks],
  );

  return { tasks, loading, error, toggleTask, deleteTask, refetch: fetchTasks };
}
