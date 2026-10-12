import { useState, useEffect, useCallback } from "react";
import { statisticsService } from "../services/statisticsService.js";

export function useDailyCompletion() {
  const [data, setData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await statisticsService.getDailyTaskCompletion();
      setData(result || { labels: [], values: [] });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
