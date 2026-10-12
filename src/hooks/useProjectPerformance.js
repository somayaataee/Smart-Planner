import { useState, useEffect, useCallback } from "react";
import { statisticsService } from "../services/statisticsService.js";

export function useProjectPerformance() {
  const [data, setData] = useState({
    totalProjects: 0,
    totalHours: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await statisticsService.getProjectPerformance();
      setData(result || { totalProjects: 0, totalHours: 0, completionRate: 0 });
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
