import { useState, useEffect, useCallback } from "react";
import { taskService } from "../services/taskService.js";

export function useSchedule() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedule = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getSchedule();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  return { items, loading, error, refetch: fetchSchedule };
}
