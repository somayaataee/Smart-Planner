import { useState, useEffect, useCallback } from "react";
import { statisticsService } from "../services/statisticsService.js";

export function useFocusTime() {
  const [data, setData] = useState({ planned: 0, actual: 0, projects: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await statisticsService.getFocusTimeAnalysis();
      setData(result || { planned: 0, actual: 0, projects: [] });
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
