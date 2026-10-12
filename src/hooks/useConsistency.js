import { useState, useEffect, useCallback } from "react";
import { habitService } from "../services/habitService.js";

export function useConsistency() {
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScore = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await habitService.getConsistencyScore();
      setScore(data?.score || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  return { score, loading, error, refetch: fetchScore };
}
