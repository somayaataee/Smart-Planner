import { useState, useEffect, useCallback } from "react";
import { habitService } from "../services/habitService.js";

export function useHabits() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHabits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await habitService.getAllHabits();
      setHabits(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch habits:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const toggleHabit = useCallback(
    async (id, date) => {
      try {
        setHabits((prev) =>
          prev.map((h) =>
            h.id === id ? { ...h, completedToday: !h.completedToday } : h,
          ),
        );
        await habitService.toggleHabit(id, date);
        await fetchHabits();
      } catch (err) {
        setHabits((prev) =>
          prev.map((h) =>
            h.id === id ? { ...h, completedToday: !h.completedToday } : h,
          ),
        );
        setError(err.message);
      }
    },
    [fetchHabits],
  );

  return { habits, loading, error, toggleHabit, refetch: fetchHabits };
}
