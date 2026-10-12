import { useState, useEffect, useCallback } from "react";
import { statisticsService } from "../services/statisticsService.js";

export function useProductivityMetrics(initialPeriod = "daily") {
  const [period, setPeriod] = useState(initialPeriod);
  const [data, setData] = useState({
    avgDailyTasks: 0,
    longestFocusSession: 0,
    goalStreak: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await statisticsService.getProductivityMetrics(period);
      setData(
        result || { avgDailyTasks: 0, longestFocusSession: 0, goalStreak: 0 },
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, period, setPeriod, loading, error, refetch: fetchData };
}
